import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";
import { SPEED_LIMIT, clampScore, nowTime, type Tone } from "@/lib/safety";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export type Telemetry = {
  speed: number;
  speedLimit: number;
  helmet: "ON" | "OFF";
  phone: "SAFE" | "DETECTED";
  brake: "NORMAL" | "HARSH";
  drowsiness: "NORMAL" | "ALERT";
  seatbelt: "SAFE" | "UNBUCKLED";
  gps: "CONNECTED" | "SEARCHING";
  camera: "ACTIVE" | "OFFLINE";
};

export type AlertItem = {
  id: string;
  time: string;
  title: string;
  detail: string;
  tone: Tone;
  points: number;
};

type Ctx = {
  telemetry: Telemetry;
  score: number;
  points: number;
  alerts: AlertItem[];
  redeemed: string[];
  simulate: (kind: "safe" | "warning" | "violation") => void;
  pushAlert: (a: Omit<AlertItem, "id" | "time">) => void;
  redeem: (id: string, cost: number, name: string) => boolean;
  setTelemetry: (patch: Partial<Telemetry>) => void;
  setScore: (n: number) => void;
  addPoints: (n: number) => void;
  reset: () => void;
  running: boolean;
  setRunning: (v: boolean) => void;
};

const SafetyContext = createContext<Ctx | null>(null);

const initialTelemetry: Telemetry = {
  speed: 45,
  speedLimit: SPEED_LIMIT,
  helmet: "ON",
  phone: "SAFE",
  brake: "NORMAL",
  drowsiness: "NORMAL",
  seatbelt: "SAFE",
  gps: "CONNECTED",
  camera: "ACTIVE",
};

const SAFE_EVENTS = [
  { title: "Speed within limit", detail: "Speed compliance maintained", points: 15 },
  { title: "Helmet verified", detail: "AI vision confirmed helmet", points: 10 },
  { title: "Smooth braking detected", detail: "No harsh deceleration", points: 15 },
  { title: "Phone-free driving", detail: "No handheld usage detected", points: 20 },
  { title: "10 km safe drive", detail: "Distance milestone reached", points: 25 },
];

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function SafetyProvider({ children }: { children: ReactNode }) {
  const { user, refreshUser } = useAuth();
  const [telemetry, setT] = useState<Telemetry>(initialTelemetry);
  const [score, setScoreState] = useState(92);
  const [points, setPoints] = useState(2450);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [running, setRunning] = useState(true);
  const [alerts, setAlerts] = useState<AlertItem[]>([
    { id: "a1", time: "10:32 AM", title: "Speed within limit", detail: "Speed compliance maintained", tone: "safe", points: 15 },
    { id: "a2", time: "10:28 AM", title: "Helmet verified", detail: "AI vision confirmed helmet", tone: "safe", points: 10 },
    { id: "a3", time: "10:21 AM", title: "Smooth braking detected", detail: "No harsh deceleration", tone: "safe", points: 15 },
  ]);
  const hydrated = useRef(false);

  // Sync score/points from backend user data
  useEffect(() => {
    if (user) {
      setScoreState(clampScore(user.safetyScore ?? 92));
      setPoints(user.totalPoints ?? 2450);
    }
  }, [user]);

  // Fetch alerts from backend
  useEffect(() => {
    if (!user) return;
    api.getAlerts({ limit: 10 }).then((res: any) => {
      const data = res?.data;
      if (data?.alerts) {
        const mapped = data.alerts.map((a: any) => ({
          id: a._id,
          time: new Date(a.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          title: a.type?.replace(/_/g, " ").toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase()) ?? "Alert",
          detail: a.message ?? "",
          tone: (a.severity === "CRITICAL" ? "danger" : a.severity === "WARNING" ? "warning" : "safe") as Tone,
          points: a.metadata?.pointsDeducted ? -a.metadata.pointsDeducted : 0,
        }));
        setAlerts(mapped);
      }
    }).catch(() => {});
  }, [user]);

  const setTelemetry = useCallback((patch: Partial<Telemetry>) => {
    setT((prev) => ({ ...prev, ...patch }));
  }, []);

  const setScore = useCallback((n: number) => setScoreState(clampScore(n)), []);
  const addPoints = useCallback(
    (n: number) => setPoints((p) => Math.max(0, p + n)),
    [],
  );

  const pushAlert = useCallback((a: Omit<AlertItem, "id" | "time">) => {
    setAlerts((prev) =>
      [{ ...a, id: Math.random().toString(36).slice(2), time: nowTime() }, ...prev].slice(0, 12),
    );
  }, []);

  // Realistic drifting telemetry
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setT((prev) => {
        const drift = Math.round((Math.random() - 0.45) * 5);
        let speed = prev.speed + drift;
        if (speed < 22) speed = 22 + Math.round(Math.random() * 4);
        if (speed > 74) speed = 74 - Math.round(Math.random() * 5);
        const brake: Telemetry["brake"] =
          drift < -4 && Math.random() > 0.75 ? "HARSH" : "NORMAL";
        return { ...prev, speed, brake };
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, [running]);

  const simulate = useCallback(
    (kind: "safe" | "warning" | "violation") => {
      // Also try to push to backend (fire-and-forget)
      api.aiDetection("driving-behaviour", {
        type: kind === "safe" ? "SAFE_BEHAVIOUR" : kind === "warning" ? "SPEED_WARNING" : "PHONE_DETECTED",
        metadata: { simulated: true },
      }).catch(() => {});

      // Refresh user data from backend after a short delay
      setTimeout(() => {
        refreshUser().catch(() => {});
      }, 1500);

      if (kind === "safe") {
        const e = SAFE_EVENTS[Math.floor(Math.random() * SAFE_EVENTS.length)]!;
        setT((p) => ({ ...p, phone: "SAFE", helmet: "ON", brake: "NORMAL", speed: 45 }));
        setScoreState((s) => clampScore(s + 2));
        addPoints(e.points);
        pushAlert({ title: e.title, detail: e.detail, tone: "safe", points: e.points });
        toast.success(`${e.title}. +${e.points} points`);
      } else if (kind === "warning") {
        setT((p) => ({ ...p, speed: p.speedLimit - 1 }));
        pushAlert({
          title: "Speed approaching limit",
          detail: "Reduce throttle to stay compliant",
          tone: "warning",
          points: 0,
        });
        toast.warning("Speed approaching limit");
      } else {
        setT((p) => ({ ...p, phone: "DETECTED", speed: p.speedLimit + 12 }));
        setScoreState((s) => clampScore(s - 7));
        addPoints(-100);
        pushAlert({
          title: "Mobile phone detected",
          detail: "Handheld usage while in motion",
          tone: "danger",
          points: -100,
        });
        toast.error("Phone usage detected. -100 points");
        window.setTimeout(() => setT((p) => ({ ...p, phone: "SAFE" })), 6000);
      }
    },
    [addPoints, pushAlert, refreshUser],
  );

  const redeem = useCallback(
    (id: string, cost: number, name: string) => {
      // Call real backend
      api.redeemReward(id).then(() => {
        toast.success(`${name} redeemed. -${cost} points`);
        refreshUser().catch(() => {});
      }).catch((err) => {
        toast.error(err.message || "Redemption failed");
      });

      if (points < cost) return false;
      setPoints((p) => p - cost);
      setRedeemed((r) => [...r, id]);
      return true;
    },
    [points, refreshUser],
  );

  const reset = useCallback(() => {
    setT(initialTelemetry);
    setScoreState(92);
    setPoints(2450);
    setRedeemed([]);
  }, []);

  const value = useMemo(
    () => ({
      telemetry,
      score,
      points,
      alerts,
      redeemed,
      simulate,
      pushAlert,
      redeem,
      setTelemetry,
      setScore,
      addPoints,
      reset,
      running,
      setRunning,
    }),
    [telemetry, score, points, alerts, redeemed, simulate, pushAlert, redeem, setTelemetry, setScore, addPoints, reset, running],
  );

  return <SafetyContext.Provider value={value}>{children}</SafetyContext.Provider>;
}

export function useSafety() {
  const ctx = useContext(SafetyContext);
  if (!ctx) throw new Error("useSafety must be used within SafetyProvider");
  return ctx;
}
