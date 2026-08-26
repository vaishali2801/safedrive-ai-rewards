import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  AlertTriangle,
  CheckCircle2,
  Coins,
  Gauge,
  MapPin,
  Route as RouteIcon,
  ShieldAlert,
  Zap,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import {
  LiveDot,
  MetricCard,
  PageHeader,
  Panel,
  SafetyRing,
  StatusBadge,
} from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { scoreLabel, toneClasses } from "@/lib/safety";
import { tripSummary, weeklyScores, currentUser } from "@/data/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Driver Dashboard — SAFEdriveX" },
      { name: "description", content: "Live safety score, real-time AI alerts, trip stats and reward points for your vehicle." },
      { property: "og:title", content: "Driver Dashboard — SAFEdriveX" },
      { property: "og:description", content: "Your live AI road-safety command centre." },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { score, points, telemetry, alerts, simulate } = useSafety();
  const overspeed = telemetry.speed > telemetry.speedLimit;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Command Centre"
          title={`Good drive, ${currentUser.name}`}
          description="Live AI safety monitoring across all connected sensors."
          action={<LiveDot label="Monitoring Active" />}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Safety Score" value={score} tone={score >= 80 ? "safe" : score >= 60 ? "warning" : "danger"} icon={<Gauge className="h-4 w-4" />} sub={scoreLabel(score)} />
          <MetricCard label="Reward Points" value={points} tone="info" icon={<Coins className="h-4 w-4" />} sub="Redeemable now" />
          <MetricCard label="Current Speed" value={telemetry.speed} unit="km/h" tone={overspeed ? "danger" : "safe"} icon={<Zap className="h-4 w-4" />} sub={`Limit ${telemetry.speedLimit} km/h`} />
          <MetricCard label="Violations Today" value={alerts.filter((a) => a.tone === "danger").length} tone="warning" icon={<ShieldAlert className="h-4 w-4" />} sub="Auto-logged by AI" />
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Panel title="Live Safety Score" subtitle="Recalculated after every AI event">
            <div className="flex flex-col items-center gap-4">
              <SafetyRing score={score} label={scoreLabel(score)} />
              <div className="grid w-full grid-cols-3 gap-2 text-center">
                <div className="rounded-xl border border-border/60 bg-surface/60 p-3">
                  <p className="text-metric text-lg text-safe">{tripSummary.safeTrips}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Safe trips</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/60 p-3">
                  <p className="text-metric text-lg text-info">{tripSummary.distance}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">km driven</p>
                </div>
                <div className="rounded-xl border border-border/60 bg-surface/60 p-3">
                  <p className="text-metric text-lg text-danger">{tripSummary.violations}</p>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Violations</p>
                </div>
              </div>
            </div>
          </Panel>

          <Panel
            title="Simulate AI Detection"
            subtitle="Demo controls for judges — trigger live events"
            action={<StatusBadge tone="warning">Demo Mode</StatusBadge>}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              <button
                onClick={() => simulate("safe")}
                className="rounded-xl border border-safe/35 bg-safe/10 px-4 py-4 text-sm font-bold text-safe transition-transform hover:scale-[1.02]"
              >
                <CheckCircle2 className="mx-auto mb-2 h-5 w-5" />
                Safe Behaviour
              </button>
              <button
                onClick={() => simulate("warning")}
                className="rounded-xl border border-warning/35 bg-warning/10 px-4 py-4 text-sm font-bold text-warning transition-transform hover:scale-[1.02]"
              >
                <AlertTriangle className="mx-auto mb-2 h-5 w-5" />
                Warning Event
              </button>
              <button
                onClick={() => simulate("violation")}
                className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-4 text-sm font-bold text-danger transition-transform hover:scale-[1.02]"
              >
                <ShieldAlert className="mx-auto mb-2 h-5 w-5" />
                Violation
              </button>
            </div>

            <div className="mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyScores} margin={{ left: -22, right: 6, top: 8 }}>
                  <defs>
                    <linearGradient id="sc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--safe)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--safe)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis domain={[60, 100]} stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--popover)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      color: "var(--foreground)",
                    }}
                  />
                  <Area type="monotone" dataKey="score" stroke="var(--safe)" strokeWidth={2.5} fill="url(#sc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Panel
            title="Recent AI Alerts"
            subtitle="Streaming from vision + IoT modules"
            action={
              <Link to="/live-monitoring" className="text-xs font-semibold text-safe hover:underline">
                View live
              </Link>
            }
          >
            <ul className="space-y-2">
              {alerts.map((a) => {
                const t = toneClasses[a.tone];
                return (
                  <li
                    key={a.id}
                    className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border px-4 py-3 ${t.border} ${t.bg}`}
                  >
                    <div className="min-w-0">
                      <p className={`truncate text-sm font-semibold ${t.text}`}>{a.title}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {a.detail} · {a.time}
                      </p>
                    </div>
                    <span className={`text-metric shrink-0 text-sm ${t.text}`}>
                      {a.points > 0 ? `+${a.points}` : a.points}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Panel>

          <Panel title="Current Trip" subtitle="Bhavnagar → GEC Campus">
            <div className="space-y-3 text-sm">
              {[
                { icon: MapPin, label: "Location", value: "Kaliyabid, Bhavnagar" },
                { icon: RouteIcon, label: "Distance", value: "8.4 km" },
                { icon: Gauge, label: "Avg Speed", value: `${Math.max(20, telemetry.speed - 6)} km/h` },
                { icon: Zap, label: "Helmet", value: telemetry.helmet },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <r.icon className="h-4 w-4" /> {r.label}
                  </span>
                  <span className="font-semibold">{r.value}</span>
                </div>
              ))}
            </div>
            <Link
              to="/rewards"
              className="mt-4 block rounded-xl bg-info/15 py-3 text-center text-sm font-bold text-info transition-colors hover:bg-info/25"
            >
              Redeem your {points.toLocaleString("en-IN")} points
            </Link>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
