import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  Camera,
  Eye,
  Gauge,
  HardHat,
  Radio,
  Satellite,
  Smartphone,
  Waves,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveDot, PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { toneClasses, type Tone } from "@/lib/safety";
import { routePath, sensors } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/live-monitoring")({
  head: () => ({
    meta: [
      { title: "Live Monitoring — SAFEdriveX" },
      {
        name: "description",
        content:
          "Real-time AI camera feed, GPS route tracking and IoT sensor telemetry for every active ride.",
      },
      { property: "og:title", content: "Live Monitoring — SAFEdriveX" },
      { property: "og:description", content: "Real-time AI detection and sensor telemetry." },
    ],
  }),
  component: LiveMonitoringPage,
});

function LiveMonitoringPage() {
  const { telemetry, running, setRunning, simulate, alerts } = useSafety();
  const overspeed = telemetry.speed > telemetry.speedLimit;
  const speedPct = Math.min(100, (telemetry.speed / 100) * 100);

  const detections: { label: string; ok: boolean; icon: typeof Eye; value: string }[] = [
    { label: "Helmet", ok: telemetry.helmet === "ON", icon: HardHat, value: telemetry.helmet },
    { label: "Phone", ok: telemetry.phone === "SAFE", icon: Smartphone, value: telemetry.phone },
    { label: "Seat Belt", ok: telemetry.seatbelt === "SAFE", icon: Waves, value: telemetry.seatbelt },
    { label: "Braking", ok: telemetry.brake === "NORMAL", icon: Activity, value: telemetry.brake },
    { label: "Drowsiness", ok: telemetry.drowsiness === "NORMAL", icon: Eye, value: telemetry.drowsiness },
    { label: "Camera", ok: telemetry.camera === "ACTIVE", icon: Camera, value: telemetry.camera },
  ];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Edge AI"
          title="Live Monitoring"
          description="Streaming detections from the on-board camera and IoT sensor array."
          action={
            <button
              onClick={() => setRunning(!running)}
              className={cn(
                "rounded-xl border px-4 py-2 text-sm font-semibold transition-colors",
                running
                  ? "border-danger/40 bg-danger/10 text-danger hover:bg-danger/20"
                  : "border-safe/40 bg-safe/10 text-safe hover:bg-safe/20",
              )}
            >
              {running ? "Pause Stream" : "Resume Stream"}
            </button>
          }
        />

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel
            title="AI Camera Feed"
            subtitle="ESP32-CAM · 15 fps · on-device inference"
            action={<LiveDot tone={running ? "safe" : "warning"} label={running ? "LIVE" : "PAUSED"} />}
          >
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <motion.div
                className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-safe/15 to-transparent"
                animate={{ top: running ? ["-10%", "100%"] : "40%" }}
                transition={{ duration: 3.2, repeat: running ? Infinity : 0, ease: "linear" }}
              />
              <motion.div
                className={cn(
                  "absolute left-[22%] top-[18%] h-[46%] w-[34%] rounded-lg border-2",
                  telemetry.helmet === "ON" ? "border-safe" : "border-danger",
                )}
                animate={{ x: running ? [0, 14, -8, 0] : 0, y: running ? [0, -6, 8, 0] : 0 }}
                transition={{ duration: 5, repeat: running ? Infinity : 0, ease: "easeInOut" }}
              >
                <span
                  className={cn(
                    "absolute -top-6 left-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                    telemetry.helmet === "ON"
                      ? "bg-safe text-safe-foreground"
                      : "bg-danger text-danger-foreground",
                  )}
                >
                  Helmet {telemetry.helmet} · 0.9{telemetry.helmet === "ON" ? "7" : "2"}
                </span>
              </motion.div>
              <motion.div
                className={cn(
                  "absolute bottom-[16%] right-[16%] h-[26%] w-[24%] rounded-lg border-2",
                  telemetry.phone === "SAFE" ? "border-info/50" : "border-danger",
                )}
                animate={{ opacity: telemetry.phone === "SAFE" ? 0.5 : [1, 0.4, 1] }}
                transition={{ duration: 0.8, repeat: telemetry.phone === "SAFE" ? 0 : Infinity }}
              >
                <span
                  className={cn(
                    "absolute -top-6 right-0 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase",
                    telemetry.phone === "SAFE" ? "bg-info/80 text-background" : "bg-danger text-danger-foreground",
                  )}
                >
                  Phone {telemetry.phone}
                </span>
              </motion.div>
              <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-lg bg-background/70 px-2.5 py-1.5 text-[11px] font-mono">
                <Radio className="h-3.5 w-3.5 text-danger" /> REC · CAM-01 · {telemetry.speed} km/h
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {detections.map((d) => {
                const tone: Tone = d.ok ? "safe" : "danger";
                const t = toneClasses[tone];
                return (
                  <div
                    key={d.label}
                    className={cn("flex items-center gap-2 rounded-xl border p-2.5", t.border, t.bg)}
                  >
                    <d.icon className={cn("h-4 w-4 shrink-0", t.text)} />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold">{d.label}</p>
                      <p className={cn("truncate text-[11px] font-bold", t.text)}>{d.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <div className="space-y-4">
            <Panel title="Speedometer" subtitle={`Road limit ${telemetry.speedLimit} km/h`}>
              <div className="flex items-end justify-between">
                <p
                  className={cn(
                    "text-metric text-6xl leading-none",
                    overspeed ? "text-danger" : "text-safe",
                  )}
                >
                  {telemetry.speed}
                  <span className="ml-1 text-lg opacity-70">km/h</span>
                </p>
                <StatusBadge tone={overspeed ? "danger" : "safe"}>
                  <Gauge className="h-3 w-3" /> {overspeed ? "Over Limit" : "Compliant"}
                </StatusBadge>
              </div>
              <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  className={cn("h-full rounded-full", overspeed ? "bg-danger" : "bg-safe")}
                  animate={{ width: `${speedPct}%` }}
                  transition={{ duration: 0.6 }}
                />
                <div
                  className="absolute top-0 h-full w-0.5 bg-warning"
                  style={{ left: `${telemetry.speedLimit}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Marker shows the enforced speed limit for the current road segment.
              </p>
            </Panel>

            <Panel title="GPS Route" subtitle="Live map-matched trajectory" action={<Satellite className="h-4 w-4 text-info" />}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-surface-2">
                <div className="absolute inset-0 grid-bg opacity-60" />
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                  <motion.polyline
                    points={routePath.map(([x, y]) => `${x},${y}`).join(" ")}
                    fill="none"
                    stroke="var(--safe)"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                    style={{ filter: "drop-shadow(0 0 4px var(--safe))" }}
                  />
                  <motion.circle
                    r="2.2"
                    fill="var(--info)"
                    animate={{
                      cx: routePath.map(([x]) => x),
                      cy: routePath.map(([, y]) => y),
                    }}
                    transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
                  />
                </svg>
                <div className="absolute bottom-3 left-3 rounded-lg bg-background/70 px-2.5 py-1.5 font-mono text-[11px]">
                  21.7645° N, 72.1519° E · {telemetry.gps}
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="IoT Sensor Array" subtitle="All hardware nodes reporting">
            <div className="grid gap-2 sm:grid-cols-2">
              {sensors.map((s) => (
                <div
                  key={s.key}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{s.name}</p>
                    <p className="truncate text-[11px] text-muted-foreground">{s.detail}</p>
                  </div>
                  <LiveDot label="OK" />
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            title="Live Alert Stream"
            subtitle="Newest AI events first"
            action={
              <div className="flex gap-2">
                <button
                  onClick={() => simulate("safe")}
                  className="rounded-lg border border-safe/40 bg-safe/10 px-3 py-1.5 text-xs font-semibold text-safe"
                >
                  Safe
                </button>
                <button
                  onClick={() => simulate("violation")}
                  className="rounded-lg border border-danger/40 bg-danger/10 px-3 py-1.5 text-xs font-semibold text-danger"
                >
                  Violation
                </button>
              </div>
            }
          >
            <ul className="max-h-[320px] space-y-2 overflow-y-auto pr-1">
              {alerts.map((a) => {
                const t = toneClasses[a.tone];
                return (
                  <motion.li
                    key={a.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={cn("rounded-xl border px-3 py-2.5", t.border, t.bg)}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className={cn("truncate text-sm font-semibold", t.text)}>{a.title}</p>
                      <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{a.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">{a.detail}</p>
                  </motion.li>
                );
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
