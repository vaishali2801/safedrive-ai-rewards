import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, Bike, Gauge, IdCard, Mail, MapPin, Route as RouteIcon, ShieldCheck } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  MetricCard,
  PageHeader,
  Panel,
  ProgressBar,
  SafetyRing,
  StatusBadge,
} from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { useAuth } from "@/context/AuthContext";
import { currentUser, scoreBreakdown as mockScoreBreakdown } from "@/data/mockData";
import { scoreLabel } from "@/lib/safety";
import { api } from "@/lib/api"

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Driver Profile — SAFEdriveX" },
      {
        name: "description",
        content:
          "Driver profile with vehicle details, lifetime safe-driving stats, achievements and safety score breakdown.",
      },
      { property: "og:title", content: "Driver Profile — SAFEdriveX" },
      {
        property: "og:description",
        content: "Lifetime safe-driving stats, badges and vehicle information.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const { score, points } = useSafety();
  const { user } = useAuth();
  const [realStats, setRealStats] = useState<any>(null);
  const [scoreBreakdown, setScoreBreakdown] = useState<any>(mockScoreBreakdown);

  useEffect(() => {
    api.getUserStats().then((res: any) => setRealStats(res.data)).catch(() => {});
    api.getSafetyBreakdown().then((res: any) => {
      const bd = res?.data;
      if (bd && typeof bd === "object") {
        const mapped = [
          { label: "Helmet Compliance", value: Math.min(100, 80 + (bd.helmet ?? 0)) },
          { label: "Speed Compliance", value: Math.min(100, 78 + (bd.speed ?? 0)) },
          { label: "Braking Behaviour", value: Math.min(100, 75 + (bd.braking ?? 0)) },
          { label: "Phone-Free Driving", value: Math.min(100, 82 + (bd.phone ?? 0)) },
          { label: "Smooth Driving", value: Math.min(100, 70 + (bd.smoothDriving ?? 0)) },
        ];
        setScoreBreakdown(mapped);
      }
    }).catch(() => {});
  }, []);

  const u = user
    ? {
        name: user.name?.split(" ")[0] ?? "Driver",
        fullName: user.name ?? "Driver",
        level: "Safe Driver",
        email: user.email ?? "",
        vehicle: user.vehicleId?.vehicleNumber ?? "--",
        vehicleType: user.vehicleId?.vehicleType ?? "--",
        license: user.licenseNumber ?? "--",
        city: "--",
        stats: {
          totalTrips: realStats?.totalTrips ?? user.totalTrips ?? 0,
          safeTrips: realStats?.safeTrips ?? user.safeTrips ?? 0,
          distance: realStats?.totalDistance ? Math.round(realStats.totalDistance / 1000) : Math.round((user.totalDistance ?? 0) / 1000),
          points: user.totalPoints ?? 0,
          safetyScore: user.safetyScore ?? 85,
        },
        achievements: user.achievements?.map((a: any) => ({ name: a.name, desc: a.description ?? "" })) ?? [],
      }
    : currentUser;

  const details = [
    { icon: Mail, label: "Email", value: u.email },
    { icon: Bike, label: "Vehicle", value: `${u.vehicle} · ${u.vehicleType}` },
    { icon: IdCard, label: "License", value: u.license },
    { icon: MapPin, label: "City", value: u.city },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Account"
          title="Driver Profile"
          description="Your identity, vehicle and lifetime safety record on SAFEdriveX."
          action={<StatusBadge tone="safe">Verified Driver</StatusBadge>}
        />

        <Panel className="overflow-hidden">
          <div className="grid gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center">
            <div className="grid h-24 w-24 place-items-center rounded-2xl border border-safe/30 bg-safe/12 text-3xl font-bold text-safe">
              {u.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-2xl font-bold">{u.fullName}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{u.level} · {scoreLabel(score)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <StatusBadge tone="info">{points.toLocaleString("en-IN")} points</StatusBadge>
                <StatusBadge tone="safe">Score {score}</StatusBadge>
                <StatusBadge tone="warning">{u.stats.totalTrips} trips</StatusBadge>
              </div>
            </div>
          </div>
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Trips" value={u.stats.totalTrips} tone="info" icon={<RouteIcon className="h-4.5 w-4.5" />} />
          <MetricCard label="Safe Trips" value={u.stats.safeTrips} tone="safe" icon={<ShieldCheck className="h-4.5 w-4.5" />} />
          <MetricCard label="Distance" value={u.stats.distance} unit="km" tone="info" icon={<Gauge className="h-4.5 w-4.5" />} />
          <MetricCard label="Lifetime Points" value={u.stats.points} tone="warning" icon={<Award className="h-4.5 w-4.5" />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Panel title="Current Safety Score" subtitle="Live score from the AI monitoring engine.">
            <div className="flex justify-center py-2">
              <SafetyRing score={score} label={scoreLabel(score)} />
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel title="Driver Details">
              <ul className="grid gap-2 sm:grid-cols-2">
                {details.map((d) => (
                  <li
                    key={d.label}
                    className="flex items-start gap-3 rounded-xl border border-border/70 bg-card/40 p-3"
                  >
                    <d.icon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-info" />
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{d.label}</p>
                      <p className="truncate text-sm font-medium">{d.value}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Score Breakdown">
              <div className="space-y-3">
                {scoreBreakdown.map((s: { label: string; value: number }) => (
                  <ProgressBar
                    key={s.label}
                    label={s.label}
                    value={s.value}
                    tone={s.value >= 90 ? "safe" : s.value >= 80 ? "warning" : "danger"}
                  />
                ))}
              </div>
            </Panel>
          </div>
        </div>

        <Panel title="Achievements" subtitle="Badges earned through consistent safe driving.">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {u.achievements.map((a) => (
              <div
                key={a.name}
                className="flex items-start gap-3 rounded-xl border border-warning/25 bg-warning/8 p-4"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-warning/15 text-warning">
                  <Award className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
