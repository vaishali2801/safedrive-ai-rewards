import { motion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { toneClasses, type Tone } from "@/lib/safety";

export function LiveDot({ tone = "safe", label }: { tone?: Tone; label?: string }) {
  const t = toneClasses[tone];
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium tracking-wide">
      <span className="relative flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping", t.dot)} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", t.dot)} />
      </span>
      {label ? <span className={t.text}>{label}</span> : null}
    </span>
  );
}

export function StatusBadge({
  tone = "info",
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const t = toneClasses[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.12em]",
        t.bg,
        t.border,
        t.text,
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Panel({
  children,
  className,
  title,
  action,
  subtitle,
}: {
  children: ReactNode;
  className?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn("glass-panel p-5", className)}
    >
      {(title || action) && (
        <header className="mb-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
          <div className="min-w-0">
            {title ? (
              <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {title}
              </h2>
            ) : null}
            {subtitle ? (
              <p className="mt-1 text-sm text-muted-foreground/80">{subtitle}</p>
            ) : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </header>
      )}
      {children}
    </motion.section>
  );
}

export function useCountUp(value: number, duration = 700) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(from + (value - from) * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
      else prev.current = value;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

export function MetricCard({
  label,
  value,
  unit,
  sub,
  tone = "info",
  icon,
  big,
}: {
  label: string;
  value: string | number;
  unit?: string;
  sub?: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  big?: boolean;
}) {
  const t = toneClasses[tone];
  const numeric = typeof value === "number";
  const animated = useCountUp(numeric ? (value as number) : 0);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn("glass-panel relative overflow-hidden p-4", t.border)}
    >
      <div className={cn("absolute inset-x-0 top-0 h-px", t.dot, "opacity-60")} />
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </p>
        {icon ? <span className={cn("shrink-0", t.text)}>{icon}</span> : null}
      </div>
      <p
        className={cn(
          "text-metric mt-2 leading-none",
          big ? "text-4xl" : "text-3xl",
          t.text,
        )}
      >
        {numeric ? Math.round(animated).toLocaleString("en-IN") : value}
        {unit ? <span className="ml-1 text-base font-semibold opacity-70">{unit}</span> : null}
      </p>
      {sub ? <div className="mt-2 text-xs text-muted-foreground">{sub}</div> : null}
    </motion.div>
  );
}

export function SafetyRing({
  score,
  size = 220,
  label,
}: {
  score: number;
  size?: number;
  label?: string;
}) {
  const animated = useCountUp(score, 900);
  const stroke = size * 0.075;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const tone = score >= 80 ? "safe" : score >= 60 ? "warning" : "danger";
  const color =
    tone === "safe" ? "var(--safe)" : tone === "warning" ? "var(--warning)" : "var(--danger)";
  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="var(--surface-2)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * Math.max(0, Math.min(100, score))) / 100 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 10px ${color})` }}
        />
      </svg>
      <div className="absolute text-center">
        <p className="text-metric text-5xl" style={{ color }}>
          {Math.round(animated)}
        </p>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">/ 100</p>
        {label ? (
          <p className="mt-2 text-sm font-semibold" style={{ color }}>
            {label}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function ProgressBar({
  label,
  value,
  tone = "safe",
  delay = 0,
}: {
  label: string;
  value: number;
  tone?: Tone;
  delay?: number;
}) {
  const t = toneClasses[tone];
  return (
    <div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className={cn("font-semibold tabular-nums", t.text)}>{value}%</span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
        <motion.div
          className={cn("h-full rounded-full", t.dot)}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.9, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:justify-between">
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-info">{eyebrow}</p>
        ) : null}
        <h1 className="mt-1 truncate text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
