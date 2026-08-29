import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Panel, ProgressBar, SafetyRing, StatusBadge } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { scoreLabel, scoreTone } from "@/lib/safety";
import { PENALTY_POINTS, REWARD_POINTS, monthlyScores, scoreBreakdown as mockBreakdown, weeklyScores } from "@/data/mockData";
import { api } from "@/lib/api"

export const Route = createFileRoute("/safety-score")({
  head: () => ({
    meta: [
      { title: "Safety Score — SAFEdriveX" },
      {
        name: "description",
        content:
          "Understand how your AI safety score is calculated across helmet, speed, braking and phone-usage compliance.",
      },
      { property: "og:title", content: "Safety Score — SAFEdriveX" },
      { property: "og:description", content: "Full breakdown of your AI-calculated driving safety score." },
    ],
  }),
  component: SafetyScorePage,
});

const chartTip = {
  contentStyle: {
    background: "var(--surface-2)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
  },
} as const;

function SafetyScorePage() {
  const { score } = useSafety();
  const tone = scoreTone(score);
  const [realBreakdown, setRealBreakdown] = useState<any[]>(mockBreakdown);
  const [historyData, setHistoryData] = useState<any[]>([]);

  useEffect(() => {
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
        setRealBreakdown(mapped);
      }
    }).catch(() => {});
    api.getSafetyHistory({ limit: 30 }).then((res: any) => {
      const hist = res?.data;
      if (Array.isArray(hist) && hist.length > 0) {
        setHistoryData(hist.map((h: any) => ({
          day: new Date(h.createdAt).toLocaleDateString("en-IN", { day: "numeric" }),
          score: h.score ?? 85,
        })));
      }
    }).catch(() => {});
  }, []);

  const breakdown = realBreakdown;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Scoring Engine"
          title="Safety Score"
          description="Every AI detection adjusts your score in real time. 100 is a perfect, violation-free driver."
          action={<StatusBadge tone={tone}>{scoreLabel(score)}</StatusBadge>}
        />

        <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <Panel title="Current Score">
            <div className="flex flex-col items-center gap-5">
              <SafetyRing score={score} label={scoreLabel(score)} />
              <div className="grid w-full grid-cols-3 gap-2 text-center">
                {[
                  { band: "80-100", label: "Safe", tone: "text-safe" },
                  { band: "60-79", label: "Improve", tone: "text-warning" },
                  { band: "0-59", label: "High Risk", tone: "text-danger" },
                ].map((b) => (
                  <div key={b.band} className="rounded-xl border border-border bg-surface-2/50 p-2.5">
                    <p className={`text-sm font-bold ${b.tone}`}>{b.band}</p>
                    <p className="text-[11px] text-muted-foreground">{b.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Panel>

          <Panel title="Score Breakdown" subtitle="Weighted contribution of each AI module">
            <div className="space-y-4">
              {breakdown.map((s: any, i: number) => (
                <ProgressBar
                  key={s.label}
                  label={s.label}
                  value={s.value}
                  delay={i * 0.08}
                  tone={s.value >= 90 ? "safe" : s.value >= 75 ? "warning" : "danger"}
                />
              ))}
            </div>
            <div className="mt-5 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={breakdown} outerRadius="78%">
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="label" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} />
                  <Radar dataKey="value" stroke="var(--safe)" fill="var(--safe)" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Weekly Trend" subtitle="Score vs violations">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Tooltip {...chartTip} />
                  <Bar dataKey="score" fill="var(--safe)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="violations" fill="var(--danger)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="30-Day History" subtitle="Rolling daily safety score">
            <div className="h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData.length > 0 ? historyData : monthlyScores}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} interval={4} />
                  <YAxis domain={[60, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} />
                  <Tooltip {...chartTip} />
                  <Line type="monotone" dataKey="score" stroke="var(--info)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="Reward Actions" subtitle="Positive behaviour adds points">
            <ul className="grid gap-2 sm:grid-cols-2">
              {REWARD_POINTS.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center justify-between rounded-xl border border-safe/25 bg-safe/8 px-3 py-2 text-sm"
                >
                  <span className="truncate">{r.label}</span>
                  <span className="shrink-0 font-bold text-safe">+{r.points}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Penalty Actions" subtitle="Violations deduct points instantly">
            <ul className="grid gap-2 sm:grid-cols-2">
              {PENALTY_POINTS.map((p) => (
                <li
                  key={p.label}
                  className="flex items-center justify-between rounded-xl border border-danger/25 bg-danger/8 px-3 py-2 text-sm"
                >
                  <span className="truncate">{p.label}</span>
                  <span className="shrink-0 font-bold text-danger">{p.points}</span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </AppShell>
  );
}
