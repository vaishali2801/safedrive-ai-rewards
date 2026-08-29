import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown, Medal, Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import { leaderboard as mockLeaderboard } from "@/data/mockData";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — SAFEdriveX" },
      {
        name: "description",
        content: "Compete on college, city and state safe-driving leaderboards ranked by AI safety score and points.",
      },
      { property: "og:title", content: "Leaderboard — SAFEdriveX" },
      { property: "og:description", content: "Who is driving safest in your city this week?" },
    ],
  }),
  component: LeaderboardPage,
});

const scopes = ["weekly", "monthly", "all-time"] as const;
const scopeLabels: Record<string, string> = { weekly: "Weekly", monthly: "Monthly", "all-time": "All Time" };
const podiumStyle = [
  { ring: "border-warning/50 bg-warning/10 text-warning", icon: Crown, h: "h-28" },
  { ring: "border-info/40 bg-info/10 text-info", icon: Trophy, h: "h-20" },
  { ring: "border-safe/40 bg-safe/10 text-safe", icon: Medal, h: "h-16" },
];

function LeaderboardPage() {
  const [scope, setScope] = useState<(typeof scopes)[number]>("weekly");
  const [realRows, setRealRows] = useState<any[]>([]);

  useEffect(() => {
    api.getLeaderboard({ period: scope, limit: 50 }).then((res: any) => {
      const data = res?.data;
      const lb = data?.leaderboard ?? data ?? [];
      if (Array.isArray(lb)) {
        setRealRows(lb.map((r: any) => ({
          rank: r.rank,
          name: r.user?.name ?? r.name ?? "Driver",
          points: r.points ?? r.totalPoints ?? 0,
          score: r.safetyScore ?? 85,
          trips: r.safeTrips ?? r.trips ?? 0,
        })));
      }
    }).catch(() => {});
  }, [scope]);

  const rows = realRows.length > 0 ? realRows : (mockLeaderboard as any)["College"] ?? [];
  const podium = rows.length >= 3 ? [rows[1], rows[0], rows[2]] : [];

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Community"
          title="Safety Leaderboard"
          description="Rankings refresh every week. Safe driving is the only way up."
          action={
            <div className="flex gap-1 rounded-xl border border-border p-1">
              {scopes.map((s) => (
                <button
                  key={s}
                  onClick={() => setScope(s)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    scope === s ? "bg-safe/15 text-safe" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {scopeLabels[s]}
                </button>
              ))}
            </div>
          }
        />

        <Panel title={`${scope} podium`} subtitle="Top three safest drivers">
          <div className="grid grid-cols-3 items-end gap-3">
            {podium.map((p, i) => {
              const style = podiumStyle[i === 0 ? 1 : i === 1 ? 0 : 2]!;
              const Icon = style.icon;
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className={cn("grid h-12 w-12 place-items-center rounded-full border", style.ring)}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="text-metric text-lg text-info">{p.points.toLocaleString("en-IN")}</p>
                  <div
                    className={cn(
                      "w-full rounded-t-xl border border-b-0 text-center text-xs font-bold leading-[3rem]",
                      style.ring,
                      style.h,
                    )}
                  >
                    #{p.rank}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Panel>

        <Panel title="Full ranking" subtitle={`${scope} level · updated weekly`}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="pb-3 pl-2">Rank</th>
                  <th className="pb-3">Driver</th>
                  <th className="pb-3 text-right">Score</th>
                  <th className="pb-3 text-right">Trips</th>
                  <th className="pb-3 pr-2 text-right">Points</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r: { rank: number; name: string; points: number; score: number; trips: number }) => {
                  const me = r.name === "Vaishali";
                  return (
                    <tr
                      key={r.name}
                      className={cn(
                        "border-t border-border/70",
                        me && "bg-safe/8",
                      )}
                    >
                      <td className="py-3 pl-2 font-mono text-muted-foreground">#{r.rank}</td>
                      <td className="py-3 font-medium">
                        <span className="flex items-center gap-2">
                          <span className="grid h-7 w-7 place-items-center rounded-full bg-surface-2 text-xs font-bold">
                            {r.name[0]}
                          </span>
                          {r.name}
                          {me ? <StatusBadge tone="safe">You</StatusBadge> : null}
                        </span>
                      </td>
                      <td className="py-3 text-right font-semibold text-safe">{r.score}</td>
                      <td className="py-3 text-right text-muted-foreground">{r.trips}</td>
                      <td className="py-3 pr-2 text-right font-bold text-info">
                        {r.points.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
