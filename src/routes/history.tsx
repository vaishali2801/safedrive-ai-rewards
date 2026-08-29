import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronDown, MapPin, Route as RouteIcon, Timer } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard, PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import { scoreTone, toneClasses } from "@/lib/safety";
import { trips as mockTrips, tripSummary as mockTripSummary } from "@/data/mockData";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Driving History — SAFEdriveX" },
      {
        name: "description",
        content: "Trip-by-trip driving history with AI event timeline, distance, max speed and score per ride.",
      },
      { property: "og:title", content: "Driving History — SAFEdriveX" },
      { property: "og:description", content: "Every trip scored and logged by the AI safety engine." },
    ],
  }),
  component: HistoryPage,
});

const filters = ["All", "Safe", "Violations"] as const;

function HistoryPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [openId, setOpenId] = useState<string | null>("t1");
  const [realTrips, setRealTrips] = useState<any[]>([]);
  const [realStats, setRealStats] = useState<any>(null);

  useEffect(() => {
    api.getDrivingHistory({ limit: 20 }).then((res: any) => {
      const sessions = res?.data?.sessions ?? res?.data ?? [];
      if (sessions.length > 0) {
        const mapped = sessions.map((s: any, i: number) => ({
          id: s._id || `t${i}`,
          date: new Date(s.startTime).toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
          route: s.startLocation?.address ? `${s.startLocation.address} → ${s.endLocation?.address ?? "Destination"}` : `Trip ${i + 1}`,
          distance: s.distance ?? 0,
          maxSpeed: s.maxSpeed ?? 0,
          violations: s.violations?.length ?? 0,
          score: s.safetyScore ?? 85,
          points: s.pointsEarned ?? 0,
          duration: s.endTime ? `${Math.round((new Date(s.endTime).getTime() - new Date(s.startTime).getTime()) / 60000)} min` : "In progress",
          events: [],
        }));
        setRealTrips(mapped);
      }
    }).catch(() => {});
    api.getDrivingStats().then((res: any) => {
      setRealStats(res.data);
    }).catch(() => {});
  }, []);

  const trips = realTrips.length > 0 ? realTrips : mockTrips;
  const tripSummary = realStats
    ? { trips: realStats.totalSessions ?? 0, safeTrips: realStats.safeTrips ?? 0, violations: realStats.violations ?? 0, distance: realStats.totalDistance ? Math.round(realStats.totalDistance / 1000) : 0 }
    : mockTripSummary;

  const list = useMemo(
    () =>
      trips.filter((t) =>
        filter === "All" ? true : filter === "Safe" ? t.violations === 0 : t.violations > 0,
      ),
    [filter, trips],
  );

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Trip Log"
          title="Driving History"
          description="Complete AI-audited record of every ride, with event-level detail."
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total Trips" value={tripSummary.trips} tone="info" icon={<RouteIcon className="h-4 w-4" />} />
          <MetricCard label="Safe Trips" value={tripSummary.safeTrips} tone="safe" icon={<CalendarDays className="h-4 w-4" />} />
          <MetricCard label="Violations" value={tripSummary.violations} tone="danger" icon={<Timer className="h-4 w-4" />} />
          <MetricCard label="Distance" value={tripSummary.distance} unit="km" tone="warning" icon={<MapPin className="h-4 w-4" />} />
        </div>

        <Panel
          title="Trips"
          subtitle="Tap a trip to expand its AI event timeline"
          action={
            <div className="flex gap-1 rounded-xl border border-border p-1">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors",
                    filter === f ? "bg-safe/15 text-safe" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          }
        >
          <ul className="space-y-2">
            {list.map((t) => {
              const tone = scoreTone(t.score);
              const tc = toneClasses[tone];
              const open = openId === t.id;
              return (
                <li key={t.id} className="rounded-2xl border border-border bg-surface-2/40">
                  <button
                    onClick={() => setOpenId(open ? null : t.id)}
                    className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 text-left"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{t.route}</p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {t.date} · {t.distance} km · {t.duration} · max {t.maxSpeed} km/h
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className={cn("text-metric text-xl", tc.text)}>{t.score}</span>
                      <StatusBadge tone={t.violations ? "danger" : "safe"}>
                        {t.violations ? `${t.violations} viol.` : "Clean"}
                      </StatusBadge>
                      <ChevronDown
                        className={cn("h-4 w-4 text-muted-foreground transition-transform", open && "rotate-180")}
                      />
                    </div>
                  </button>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border px-4 py-3">
                          <div className="mb-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="rounded-lg border border-border px-2 py-1">
                              Points earned: <b className="text-info">{t.points}</b>
                            </span>
                            <span className="rounded-lg border border-border px-2 py-1">
                              Duration: <b className="text-foreground">{t.duration}</b>
                            </span>
                          </div>
                          <ol className="relative space-y-3 border-l border-border pl-4">
                            {t.events.map((e: { time: string; label: string; type: "safe" | "warning" | "danger" }, i: number) => {
                              const ec = toneClasses[e.type];
                              return (
                                <li key={i} className="relative">
                                  <span
                                    className={cn(
                                      "absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full",
                                      ec.dot,
                                    )}
                                  />
                                  <p className={cn("text-sm font-medium", ec.text)}>{e.label}</p>
                                  <p className="font-mono text-[11px] text-muted-foreground">{e.time}</p>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>
    </AppShell>
  );
}
