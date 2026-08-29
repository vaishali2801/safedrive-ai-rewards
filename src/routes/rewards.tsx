import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Coffee, Fuel, Gift, ShieldCheck, ShoppingBag, Wrench } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard, PageHeader, Panel, ProgressBar, StatusBadge } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { PENALTY_POINTS, REWARD_POINTS, rewards as mockRewards } from "@/data/mockData";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/rewards")({
  head: () => ({
    meta: [
      { title: "Rewards — SAFEdriveX" },
      {
        name: "description",
        content: "Redeem safe-driving points for fuel cashback, vouchers, free service and insurance discounts.",
      },
      { property: "og:title", content: "Rewards — SAFEdriveX" },
      { property: "og:description", content: "Turn safe driving into real-world rewards." },
    ],
  }),
  component: RewardsPage,
});

const icons: Record<string, typeof Gift> = {
  coffee: Coffee,
  fuel: Fuel,
  bag: ShoppingBag,
  wrench: Wrench,
  shield: ShieldCheck,
};

const CATEGORY_ICONS: Record<string, typeof Gift> = {
  FOOD: Coffee, FUEL: Fuel, SHOPPING: ShoppingBag, SERVICE: Wrench, INSURANCE: ShieldCheck, OTHER: Gift,
};

function RewardsPage() {
  const { points, redeem, redeemed } = useSafety();
  const [realRewards, setRealRewards] = useState<any[]>([]);
  const [redemptionCount, setRedemptionCount] = useState(0);

  useEffect(() => {
    api.getRewards({ limit: 20 }).then((res: any) => {
      const list = res?.data?.rewards ?? res?.data ?? [];
      if (list.length > 0) {
        setRealRewards(list.map((r: any) => ({
          id: r._id,
          name: r.name,
          points: r.pointsRequired,
          desc: r.description ?? "",
          icon: r.category?.toLowerCase() ?? "other",
          partner: r.category ?? "SAFEdriveX",
          category: r.category,
          stock: r.stock,
        })));
      }
    }).catch(() => {});
    api.getMyRedemptions({ limit: 50 }).then((res: any) => {
      const list = res?.data?.redemptions ?? res?.data ?? [];
      setRedemptionCount(Array.isArray(list) ? list.length : 0);
    }).catch(() => {});
  }, []);

  const rewards = realRewards.length > 0 ? realRewards : mockRewards;
  const next = rewards.find((r: any) => r.points > points) ?? rewards[rewards.length - 1]!;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Reward Wallet"
          title="Rewards Store"
          description="Safe kilometres convert into points. Points convert into real benefits."
          action={<StatusBadge tone="info">{points.toLocaleString("en-IN")} points available</StatusBadge>}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard label="Points Balance" value={points} tone="info" icon={<Gift className="h-4 w-4" />} big />
          <MetricCard label="Rewards Redeemed" value={redemptionCount || redeemed.length} tone="safe" sub="Lifetime redemptions" />
          <MetricCard
            label="Next Unlock"
            value={next.name}
            tone="warning"
            sub={`${Math.max(0, next.points - points).toLocaleString("en-IN")} points to go`}
          />
        </div>

        <Panel title="Progress to next reward" subtitle={next.name}>
          <ProgressBar
            label={`${points.toLocaleString("en-IN")} / ${next.points.toLocaleString("en-IN")} pts`}
            value={Math.min(100, Math.round((points / next.points) * 100))}
            tone="info"
          />
        </Panel>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rewards.map((r, i) => {
            const Icon = icons[r.icon] ?? Gift;
            const affordable = points >= r.points;
            const claimed = redeemed.includes(r.id);
            return (
              <motion.article
                key={r.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className={cn(
                  "glass-panel flex flex-col p-5",
                  affordable ? "border-safe/30" : "border-border",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                      affordable ? "bg-safe/15 text-safe" : "bg-surface-2 text-muted-foreground",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <StatusBadge tone={affordable ? "safe" : "warning"}>
                    {r.points.toLocaleString("en-IN")} pts
                  </StatusBadge>
                </div>
                <h3 className="mt-3 text-lg font-semibold">{r.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{r.desc}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Partner · {r.partner}
                </p>
                <button
                  disabled={!affordable}
                  onClick={() => redeem(r.id, r.points, r.name)}
                  className={cn(
                    "mt-4 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors",
                    affordable
                      ? "bg-safe text-safe-foreground hover:bg-safe/90"
                      : "cursor-not-allowed border border-border bg-surface-2 text-muted-foreground",
                  )}
                >
                  {affordable ? (claimed ? "Redeem again" : "Redeem now") : "Not enough points"}
                </button>
              </motion.article>
            );
          })}
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="How you earn" subtitle="AI-verified safe behaviour">
            <ul className="grid gap-2 sm:grid-cols-2">
              {REWARD_POINTS.map((r) => (
                <li key={r.label} className="flex items-center justify-between rounded-xl border border-safe/25 bg-safe/8 px-3 py-2 text-sm">
                  <span className="truncate">{r.label}</span>
                  <span className="shrink-0 font-bold text-safe">+{r.points}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="How you lose" subtitle="Detected violations">
            <ul className="grid gap-2 sm:grid-cols-2">
              {PENALTY_POINTS.map((p) => (
                <li key={p.label} className="flex items-center justify-between rounded-xl border border-danger/25 bg-danger/8 px-3 py-2 text-sm">
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
