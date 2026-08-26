import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Brain,
  Cpu,
  Gauge,
  Gift,
  ShieldCheck,
  Siren,
  Trophy,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { LiveDot, StatusBadge } from "@/components/safety/primitives";
import { REWARD_POINTS, PENALTY_POINTS, safetyModules } from "@/data/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SAFEdriveX — AI-Powered Road Safety & Reward System" },
      {
        name: "description",
        content:
          "AI detects unsafe behaviour, warns the driver instantly, updates the driving score and converts safe kilometres into real rewards.",
      },
      { property: "og:title", content: "SAFEdriveX — AI-Powered Road Safety & Reward System" },
      {
        property: "og:description",
        content: "Smart-city road safety: AI vision, IoT telemetry, live scoring and safety rewards.",
      },
    ],
  }),
  component: Landing,
});

const flow = [
  { icon: Brain, title: "AI Detects", desc: "Vision + IoT sensors spot unsafe behaviour in real time." },
  { icon: Siren, title: "Driver Warned", desc: "Instant on-device voice and visual alerts." },
  { icon: Gauge, title: "Score Updates", desc: "Safety score recalculates for every event." },
  { icon: Gift, title: "Rewards Earned", desc: "Safe points become fuel, insurance and shopping perks." },
];

const stats = [
  { value: "1.5L+", label: "Annual road deaths in India" },
  { value: "70%", label: "Crashes linked to human behaviour" },
  { value: "92", label: "Average SAFEdriveX driver score" },
  { value: "8", label: "AI safety modules running live" },
];

export default function Landing() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 lg:px-8">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              Login
            </Link>
            <Link
              to="/dashboard"
              className="rounded-xl bg-safe px-4 py-2 text-sm font-bold text-safe-foreground transition-transform hover:scale-[1.03]"
            >
              Launch Demo
            </Link>
          </div>
        </div>
      </header>

      <section className="grid-lines relative overflow-hidden px-4 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <StatusBadge tone="info">Future 6.0 · Smart City Prototype</StatusBadge>
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
            >
              Drive Safe.
              <br />
              <span className="text-safe drop-shadow-[0_0_24px_var(--safe)]">Earn Rewards.</span>
              <br />
              Save Lives.
            </motion.h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              SAFEdriveX fuses AI computer vision with IoT vehicle telemetry to catch unsafe
              behaviour the moment it happens — then rewards every safe kilometre you ride.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-safe px-6 py-3 text-sm font-bold text-safe-foreground shadow-[0_0_32px_-8px_var(--safe)] transition-transform hover:scale-[1.03]"
              >
                Open Live Dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/live-monitoring"
                className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-safe/50"
              >
                <Activity className="h-4 w-4" /> Watch Live Monitoring
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <LiveDot label="AI Engine Online" />
              <LiveDot tone="info" label="IoT Sensors Connected" />
              <LiveDot tone="warning" label="Simulated Demo Data" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel relative p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Live Safety Feed
              </p>
              <LiveDot label="REC" tone="danger" />
            </div>
            <div className="mt-5 space-y-3">
              {[
                { t: "Helmet verified", tone: "safe", p: "+10" },
                { t: "Speed 48 / 60 km/h", tone: "safe", p: "+15" },
                { t: "Approaching speed limit", tone: "warning", p: "0" },
                { t: "Mobile phone detected", tone: "danger", p: "-100" },
              ].map((e, i) => (
                <motion.div
                  key={e.t}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * i }}
                  className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm ${
                    e.tone === "safe"
                      ? "border-safe/30 bg-safe/10 text-safe"
                      : e.tone === "warning"
                        ? "border-warning/30 bg-warning/10 text-warning"
                        : "border-danger/35 bg-danger/10 text-danger"
                  }`}
                >
                  <span className="font-medium">{e.t}</span>
                  <span className="text-metric text-sm">{e.p}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/60 pt-5 text-center">
              <div>
                <p className="text-metric text-2xl text-safe">92</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Score</p>
              </div>
              <div>
                <p className="text-metric text-2xl text-info">2,450</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Points</p>
              </div>
              <div>
                <p className="text-metric text-2xl text-warning">3</p>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Alerts</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-surface/40 px-4 py-10 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-metric text-3xl text-safe">{s.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-bold tracking-tight">How SAFEdriveX Works</h2>
          <p className="mx-auto mt-2 max-w-2xl text-center text-sm text-muted-foreground">
            One closed loop: detect, warn, score, reward.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {flow.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass-panel p-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-safe/12 text-safe">
                  <f.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-[11px] font-bold tracking-[0.2em] text-info">STEP {i + 1}</p>
                <h3 className="mt-1 text-lg font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight">AI Safety Modules</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {safetyModules.map((m) => (
              <div key={m.title} className="glass-panel p-5">
                <div className="flex items-start justify-between gap-2">
                  <Cpu className="h-5 w-5 text-info" />
                  <StatusBadge tone={m.status === "ACTIVE" ? "safe" : "warning"}>{m.status}</StatusBadge>
                </div>
                <h3 className="mt-4 font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 text-safe">
              <Trophy className="h-5 w-5" />
              <h3 className="font-semibold uppercase tracking-[0.16em]">Reward Points</h3>
            </div>
            <ul className="mt-4 divide-y divide-border/50">
              {REWARD_POINTS.map((r) => (
                <li key={r.label} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-metric text-safe">+{r.points}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 text-danger">
              <ShieldCheck className="h-5 w-5" />
              <h3 className="font-semibold uppercase tracking-[0.16em]">Penalty Points</h3>
            </div>
            <ul className="mt-4 divide-y divide-border/50">
              {PENALTY_POINTS.map((r) => (
                <li key={r.label} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-muted-foreground">{r.label}</span>
                  <span className="text-metric text-danger">{r.points}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 px-4 py-8 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Logo />
          <p className="text-xs text-muted-foreground">
            Prototype for Future 6.0 Hackathon · Simulated data, no real hardware required.
          </p>
        </div>
      </footer>
    </div>
  );
}
