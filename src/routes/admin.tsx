import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertTriangle, Gauge, ShieldCheck, TriangleAlert, Users } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard, PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import {
  adminMetrics,
  adminUsers,
  adminViolations,
  dailySafeTrips,
  redemptionData,
  scoreDistribution,
  violationTypes,
} from "@/data/mockData";
import type { Tone } from "@/lib/safety";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Console — SAFEdriveX" },
      {
        name: "description",
        content:
          "Fleet-wide road safety analytics: driver counts, violation heat, score distribution and reward redemptions.",
      },
      { property: "og:title", content: "Admin Console — SAFEdriveX" },
      {
        property: "og:description",
        content: "City-scale monitoring of drivers, violations and safety scores.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminPage,
});

const PIE_COLORS = ["var(--safe)", "var(--info)", "var(--warning)", "var(--danger)", "var(--chart-5)"];

const tooltipStyle = {
  background: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  fontSize: 12,
  color: "var(--popover-foreground)",
};

const metricIcons = [Users, ShieldCheck, Gauge, TriangleAlert, AlertTriangle];

function AdminPage() {
  const [tab, setTab] = useState<"violations" | "users">("violations");

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Authority View"
          title="Admin Console"
          description="City-scale road safety intelligence across the connected driver fleet."
          action={<StatusBadge tone="info">Bhavnagar Region</StatusBadge>}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {adminMetrics.map((m, i) => {
            const Icon = metricIcons[i] ?? Users;
            return (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                tone={m.tone as Tone}
                icon={<Icon className="h-4.5 w-4.5" />}
              />
            );
          })}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
          <Panel title="Safe Trips vs Violations" subtitle="Rolling 7-day fleet activity.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailySafeTrips} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <defs>
                    <linearGradient id="adminSafe" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--safe)" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="var(--safe)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="adminViol" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--danger)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--danger)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="safe" stroke="var(--safe)" strokeWidth={2} fill="url(#adminSafe)" />
                  <Area
                    type="monotone"
                    dataKey="violations"
                    stroke="var(--danger)"
                    strokeWidth={2}
                    fill="url(#adminViol)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Violation Types" subtitle="Detections logged today by AI modules.">
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={violationTypes} layout="vertical" margin={{ top: 4, right: 12, left: 18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey="type"
                    stroke="var(--muted-foreground)"
                    fontSize={11}
                    width={90}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
                  <Bar dataKey="count" fill="var(--danger)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Panel title="Score Distribution" subtitle="Drivers grouped by safety score band.">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="band" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--surface-2)" }} />
                  <Bar dataKey="drivers" radius={[6, 6, 0, 0]}>
                    {scoreDistribution.map((d, i) => (
                      <Cell key={d.band} fill={i < 2 ? "var(--danger)" : i < 3 ? "var(--warning)" : "var(--safe)"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Reward Redemptions" subtitle="Share of points redeemed by category.">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={redemptionData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={54}
                    outerRadius={86}
                    paddingAngle={3}
                    stroke="var(--background)"
                  >
                    {redemptionData.map((d, i) => (
                      <Cell key={d.name} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
              {redemptionData.map((d, i) => (
                <li key={d.name} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                  />
                  <span className="truncate">{d.name}</span>
                  <span className="ml-auto font-semibold text-foreground">{d.value.toLocaleString("en-IN")}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        <Panel
          title={tab === "violations" ? "Live Violation Feed" : "Registered Drivers"}
          subtitle="Switch views to audit incidents or driver accounts."
          action={
            <div className="flex rounded-full border border-border p-1">
              {(["violations", "users"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors",
                    tab === t ? "bg-safe/15 text-safe" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          }
        >
          <div className="overflow-x-auto">
            {tab === "violations" ? (
              <table className="w-full min-w-[680px] text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="pb-2 font-semibold">Driver</th>
                    <th className="pb-2 font-semibold">Violation</th>
                    <th className="pb-2 font-semibold">Location</th>
                    <th className="pb-2 font-semibold">Time</th>
                    <th className="pb-2 font-semibold">Severity</th>
                    <th className="pb-2 text-right font-semibold">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {adminViolations.map((v, i) => (
                    <tr key={`${v.driver}-${i}`} className="border-t border-border/60">
                      <td className="py-3 font-medium">{v.driver}</td>
                      <td className="py-3 text-muted-foreground">{v.violation}</td>
                      <td className="py-3 text-muted-foreground">{v.location}</td>
                      <td className="py-3 tabular-nums text-muted-foreground">{v.time}</td>
                      <td className="py-3">
                        <StatusBadge
                          tone={v.severity === "HIGH" ? "danger" : v.severity === "MEDIUM" ? "warning" : "info"}
                        >
                          {v.severity}
                        </StatusBadge>
                      </td>
                      <td className="py-3 text-right font-semibold tabular-nums text-danger">{v.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <table className="w-full min-w-[620px] text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="pb-2 font-semibold">Driver</th>
                    <th className="pb-2 font-semibold">Vehicle</th>
                    <th className="pb-2 font-semibold">Score</th>
                    <th className="pb-2 font-semibold">Trips</th>
                    <th className="pb-2 text-right font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {adminUsers.map((u) => (
                    <tr key={u.vehicle} className="border-t border-border/60">
                      <td className="py-3 font-medium">{u.name}</td>
                      <td className="py-3 tabular-nums text-muted-foreground">{u.vehicle}</td>
                      <td
                        className={cn(
                          "py-3 font-semibold tabular-nums",
                          u.score >= 90 ? "text-safe" : u.score >= 80 ? "text-warning" : "text-danger",
                        )}
                      >
                        {u.score}
                      </td>
                      <td className="py-3 tabular-nums text-muted-foreground">{u.trips}</td>
                      <td className="py-3 text-right">
                        <StatusBadge
                          tone={u.status === "Active" ? "safe" : u.status === "Flagged" ? "warning" : "danger"}
                        >
                          {u.status}
                        </StatusBadge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
