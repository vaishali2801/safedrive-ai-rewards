import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Ambulance, MapPin, Phone, ShieldAlert, Siren, X } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCard, PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { emergencyContacts } from "@/data/mockData";
import { nowTime } from "@/lib/safety";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/emergency")({
  head: () => ({
    meta: [
      { title: "Emergency SOS — SAFEdriveX" },
      {
        name: "description",
        content:
          "Automatic crash detection with 10-second SOS countdown, live location sharing and one-tap emergency contacts.",
      },
      { property: "og:title", content: "Emergency SOS — SAFEdriveX" },
      {
        property: "og:description",
        content: "Crash detection, live GPS broadcast and instant alerts to police, ambulance and family.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EmergencyPage,
});

function EmergencyPage() {
  const { pushAlert } = useSafety();
  const [countdown, setCountdown] = useState<number | null>(null);
  const [dispatched, setDispatched] = useState<string[]>([]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown <= 0) {
      setCountdown(null);
      setDispatched((d) => [`SOS broadcast sent at ${nowTime()}`, ...d].slice(0, 6));
      pushAlert({
        title: "SOS broadcast sent",
        detail: "Location shared with police, ambulance and family contacts",
        tone: "danger",
        points: 0,
      });
      toast.error("SOS dispatched. Emergency services notified.");
      return;
    }
    const id = window.setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 1000);
    return () => window.clearTimeout(id);
  }, [countdown, pushAlert]);

  const simulateCrash = () => {
    setCountdown(10);
    toast.warning("Crash signature detected — SOS countdown started");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          eyebrow="Safety Net"
          title="Emergency SOS"
          description="Accelerometer-based crash detection with automatic alerting and live location sharing."
          action={<StatusBadge tone="safe">Guardian Active</StatusBadge>}
        />

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Crash Detection" value="ARMED" tone="safe" icon={<ShieldAlert className="h-4.5 w-4.5" />} />
          <MetricCard label="GPS Accuracy" value={4} unit="m" tone="info" icon={<MapPin className="h-4.5 w-4.5" />} />
          <MetricCard label="Contacts Linked" value={emergencyContacts.length} tone="info" icon={<Phone className="h-4.5 w-4.5" />} />
          <MetricCard label="Avg Response" value="6.2" unit="min" tone="warning" icon={<Ambulance className="h-4.5 w-4.5" />} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <Panel
            title="SOS Trigger"
            subtitle="Hold or tap to broadcast your live location to all emergency channels."
          >
            <div className="flex flex-col items-center gap-6 py-4">
              <button
                onClick={() => (countdown === null ? setCountdown(10) : setCountdown(null))}
                className={cn(
                  "relative grid h-44 w-44 place-items-center rounded-full border-4 text-center transition-transform active:scale-95",
                  countdown === null
                    ? "border-danger/50 bg-danger/15 text-danger"
                    : "border-warning/60 bg-warning/15 text-warning",
                )}
                aria-label={countdown === null ? "Trigger SOS" : "Cancel SOS"}
              >
                <span className="absolute inset-0 animate-ping rounded-full border-2 border-danger/30" />
                <span className="relative">
                  <Siren className="mx-auto h-9 w-9" />
                  <span className="mt-2 block text-2xl font-bold tracking-widest">
                    {countdown === null ? "SOS" : countdown}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.2em] opacity-80">
                    {countdown === null ? "Tap to send" : "Tap to cancel"}
                  </span>
                </span>
              </button>

              <AnimatePresence>
                {countdown !== null ? (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-warning"
                  >
                    Broadcasting in {countdown}s — cancel if you are safe.
                  </motion.p>
                ) : null}
              </AnimatePresence>

              <div className="grid w-full gap-2 sm:grid-cols-2">
                <button
                  onClick={simulateCrash}
                  className="flex items-center justify-center gap-2 rounded-xl border border-danger/35 bg-danger/10 px-4 py-3 text-sm font-semibold text-danger transition-colors hover:bg-danger/20"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Simulate Crash Detection
                </button>
                <button
                  onClick={() => {
                    setCountdown(null);
                    setDispatched([]);
                    toast.success("Emergency state cleared");
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                  Reset
                </button>
              </div>
            </div>
          </Panel>

          <div className="space-y-6">
            <Panel title="Emergency Contacts" subtitle="One tap dials the channel and shares your GPS pin.">
              <ul className="space-y-2">
                {emergencyContacts.map((c) => (
                  <li
                    key={c.number}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-xl border border-border/70 bg-card/40 p-3"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{c.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.number} · {c.tag}
                      </p>
                    </div>
                    <button
                      onClick={() => toast.success(`Calling ${c.name} (${c.number})`)}
                      className="flex shrink-0 items-center gap-2 rounded-lg border border-safe/30 bg-safe/10 px-3 py-2 text-xs font-semibold text-safe"
                    >
                      <Phone className="h-3.5 w-3.5" />
                      Call
                    </button>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title="Dispatch Log" subtitle="Recent emergency broadcasts from this device.">
              {dispatched.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border/70 p-6 text-center text-sm text-muted-foreground">
                  No emergency broadcasts. You are driving safe.
                </p>
              ) : (
                <ul className="space-y-2">
                  {dispatched.map((d, i) => (
                    <li
                      key={`${d}-${i}`}
                      className="rounded-xl border border-danger/25 bg-danger/10 px-3 py-2 text-sm text-danger"
                    >
                      {d}
                    </li>
                  ))}
                </ul>
              )}
            </Panel>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
