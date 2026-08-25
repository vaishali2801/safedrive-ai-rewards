export type Tone = "safe" | "warning" | "danger" | "info";

export const SPEED_LIMIT = 60;

export function scoreTone(score: number): Tone {
  if (score >= 80) return "safe";
  if (score >= 60) return "warning";
  return "danger";
}

export function scoreLabel(score: number) {
  if (score >= 90) return "Excellent Driver";
  if (score >= 80) return "Safe Driver";
  if (score >= 60) return "Needs Improvement";
  return "High Risk Driver";
}

export const toneClasses: Record<Tone, { text: string; bg: string; border: string; dot: string }> = {
  safe: {
    text: "text-safe",
    bg: "bg-safe/10",
    border: "border-safe/30",
    dot: "bg-safe",
  },
  warning: {
    text: "text-warning",
    bg: "bg-warning/10",
    border: "border-warning/30",
    dot: "bg-warning",
  },
  danger: {
    text: "text-danger",
    bg: "bg-danger/10",
    border: "border-danger/35",
    dot: "bg-danger",
  },
  info: {
    text: "text-info",
    bg: "bg-info/10",
    border: "border-info/30",
    dot: "bg-info",
  },
};

export function clampScore(v: number) {
  return Math.max(0, Math.min(100, Math.round(v)));
}

export function formatNumber(n: number) {
  return n.toLocaleString("en-IN");
}

export function nowTime() {
  return new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
