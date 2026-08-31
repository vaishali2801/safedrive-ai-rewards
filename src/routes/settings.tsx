import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  BellOff,
  Camera,
  Gauge,
  LifeBuoy,
  MapPin,
  Moon,
  RotateCcw,
  Save,
  Settings as SettingsIcon,
  Smartphone,
  Vibrate,
  Volume2,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader, Panel, StatusBadge } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — SAFEdriveX" },
      {
        name: "description",
        content:
          "Configure SAFEdriveX AI detection thresholds, alert preferences, emergency SOS behaviour, and app preferences.",
      },
      { property: "og:title", content: "Settings — SAFEdriveX" },
      {
        property: "og:description",
        content: "Tune AI detection, notifications, and emergency SOS preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

type Settings = {
  helmetDetection: boolean;
  phoneDetection: boolean;
  speedAlerts: boolean;
  drowsinessDetection: boolean;
  sensitivity: number;
  speedLimit: number;
  pushAlerts: boolean;
  soundAlerts: boolean;
  vibration: boolean;
  weeklyReport: boolean;
  sosAutoCall: boolean;
  sosCountdown: number;
  shareLocation: boolean;
  darkMode: boolean;
  units: "km/h" | "mph";
  language: string;
};

const DEFAULTS: Settings = {
  helmetDetection: true,
  phoneDetection: true,
  speedAlerts: true,
  drowsinessDetection: false,
  sensitivity: 70,
  speedLimit: 60,
  pushAlerts: true,
  soundAlerts: true,
  vibration: true,
  weeklyReport: false,
  sosAutoCall: true,
  sosCountdown: 10,
  shareLocation: true,
  darkMode: true,
  units: "km/h",
  language: "English",
};

const STORAGE_KEY = "safedrivex-settings";

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULTS;
}

function Toggle({
  enabled,
  onChange,
  label,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={enabled}
      aria-label={label}
      onClick={() => onChange(!enabled)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
        enabled ? "bg-safe shadow-[0_0_10px_var(--safe)]" : "bg-surface-2",
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={cn(
          "absolute top-0.5 h-5 w-5 rounded-full bg-foreground shadow",
          enabled ? "right-0.5" : "left-0.5",
        )}
      />
    </button>
  );
}

function SettingRow({
  icon,
  title,
  description,
  control,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  control: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-border/60 bg-surface-2/40 px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-safe/10 text-safe">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

function SettingsPage() {
  const { reset: resetDemoData } = useSafety();
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [saved, setSaved] = useState(true);

  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const update = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const save = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    setSaved(true);
    toast.success("Settings saved", { description: "Your preferences have been applied." });
  };

  const reset = () => {
    setSettings(DEFAULTS);
    localStorage.removeItem(STORAGE_KEY);
    setSaved(true);
    toast.info("Settings reset to defaults");
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          eyebrow="Configuration"
          title="Settings"
          description="Tune AI detection sensitivity, alerts, and emergency SOS behaviour."
          action={
            <div className="flex items-center gap-2">
              <StatusBadge tone={saved ? "safe" : "warning"}>
                {saved ? "Saved" : "Unsaved changes"}
              </StatusBadge>
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
              <button
                onClick={save}
                className="inline-flex items-center gap-2 rounded-lg bg-safe px-4 py-2 text-sm font-semibold text-safe-foreground shadow-[0_0_16px_var(--safe)] transition-transform hover:scale-[1.03]"
              >
                <Save className="h-4 w-4" /> Save
              </button>
            </div>
          }
        />

        <Panel title="AI Detection Modules" subtitle="Enable or disable computer-vision models on your dashcam feed.">
          <div className="space-y-3">
            <SettingRow
              icon={<Camera className="h-4.5 w-4.5" />}
              title="Helmet Detection"
              description="Alert when rider is detected without a helmet."
              control={
                <Toggle label="Helmet detection" enabled={settings.helmetDetection} onChange={(v) => update("helmetDetection", v)} />
              }
            />
            <SettingRow
              icon={<Smartphone className="h-4.5 w-4.5" />}
              title="Phone Usage Detection"
              description="Detect mobile phone usage while driving."
              control={
                <Toggle label="Phone detection" enabled={settings.phoneDetection} onChange={(v) => update("phoneDetection", v)} />
              }
            />
            <SettingRow
              icon={<Gauge className="h-4.5 w-4.5" />}
              title="Overspeed Alerts"
              description="Warn when vehicle exceeds the configured speed limit."
              control={
                <Toggle label="Speed alerts" enabled={settings.speedAlerts} onChange={(v) => update("speedAlerts", v)} />
              }
            />
            <SettingRow
              icon={<Moon className="h-4.5 w-4.5" />}
              title="Drowsiness Detection (Beta)"
              description="Monitor eyelid closure patterns for fatigue."
              control={
                <Toggle label="Drowsiness detection" enabled={settings.drowsinessDetection} onChange={(v) => update("drowsinessDetection", v)} />
              }
            />
          </div>
        </Panel>

        <Panel title="Detection Thresholds" subtitle="Fine-tune how aggressively the AI flags events.">
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AI Sensitivity</span>
                <span className="font-semibold tabular-nums text-safe">{settings.sensitivity}%</span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={settings.sensitivity}
                onChange={(e) => update("sensitivity", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--safe)]"
                aria-label="AI sensitivity"
              />
              <p className="mt-1 text-xs text-muted-foreground/70">
                Higher sensitivity catches more events but may increase false positives.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Speed Limit Threshold</span>
                <span className="font-semibold tabular-nums text-safe">
                  {settings.speedLimit} {settings.units}
                </span>
              </div>
              <input
                type="range"
                min={30}
                max={120}
                step={5}
                value={settings.speedLimit}
                onChange={(e) => update("speedLimit", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--safe)]"
                aria-label="Speed limit threshold"
              />
            </div>
          </div>
        </Panel>

        <Panel title="Notifications" subtitle="Choose how SAFEdriveX alerts you about safety events.">
          <div className="space-y-3">
            <SettingRow
              icon={settings.pushAlerts ? <Bell className="h-4.5 w-4.5" /> : <BellOff className="h-4.5 w-4.5" />}
              title="Push Notifications"
              description="Real-time violation and reward alerts on this device."
              control={
                <Toggle label="Push notifications" enabled={settings.pushAlerts} onChange={(v) => update("pushAlerts", v)} />
              }
            />
            <SettingRow
              icon={<Volume2 className="h-4.5 w-4.5" />}
              title="Sound Alerts"
              description="Play an audible chime when a violation is detected."
              control={
                <Toggle label="Sound alerts" enabled={settings.soundAlerts} onChange={(v) => update("soundAlerts", v)} />
              }
            />
            <SettingRow
              icon={<Vibrate className="h-4.5 w-4.5" />}
              title="Haptic Feedback"
              description="Vibrate on warnings for hands-free awareness."
              control={
                <Toggle label="Haptic feedback" enabled={settings.vibration} onChange={(v) => update("vibration", v)} />
              }
            />
            <SettingRow
              icon={<Bell className="h-4.5 w-4.5" />}
              title="Weekly Safety Report"
              description="Email a summary of your driving score every Monday."
              control={
                <Toggle label="Weekly report" enabled={settings.weeklyReport} onChange={(v) => update("weeklyReport", v)} />
              }
            />
          </div>
        </Panel>

        <Panel title="Emergency SOS" subtitle="Crash detection and emergency contact behaviour.">
          <div className="space-y-3">
            <SettingRow
              icon={<LifeBuoy className="h-4.5 w-4.5" />}
              title="Auto-Call Emergency Contact"
              description="Automatically call your primary contact after the countdown ends."
              control={
                <Toggle label="SOS auto-call" enabled={settings.sosAutoCall} onChange={(v) => update("sosAutoCall", v)} />
              }
            />
            <SettingRow
              icon={<MapPin className="h-4.5 w-4.5" />}
              title="Share Live Location"
              description="Include GPS coordinates in SOS dispatches."
              control={
                <Toggle label="Share location" enabled={settings.shareLocation} onChange={(v) => update("shareLocation", v)} />
              }
            />
            <div className="rounded-xl border border-border/60 bg-surface-2/40 px-4 py-3.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-semibold">SOS Countdown</span>
                <span className="font-semibold tabular-nums text-safe">{settings.sosCountdown}s</span>
              </div>
              <input
                type="range"
                min={5}
                max={30}
                step={5}
                value={settings.sosCountdown}
                onChange={(e) => update("sosCountdown", Number(e.target.value))}
                className="mt-2 w-full accent-[var(--safe)]"
                aria-label="SOS countdown duration"
              />
              <p className="mt-1 text-xs text-muted-foreground/70">
                Time you have to cancel a false alarm before dispatch.
              </p>
            </div>
          </div>
        </Panel>

        <Panel title="App Preferences" subtitle="Display and regional options.">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Speed Units
              </span>
              <select
                value={settings.units}
                onChange={(e) => update("units", e.target.value as Settings["units"])}
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-safe/50"
              >
                <option value="km/h">km/h</option>
                <option value="mph">mph</option>
              </select>
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Language
              </span>
              <select
                value={settings.language}
                onChange={(e) => update("language", e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-border bg-surface-2 px-3 py-2.5 text-sm outline-none focus:border-safe/50"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
                <option>Tamil</option>
                <option>Telugu</option>
              </select>
            </label>
          </div>
        </Panel>

        <Panel title="Danger Zone">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-danger/30 bg-danger/5 px-4 py-3.5">
            <div>
              <p className="text-sm font-semibold text-danger">Reset Demo Data</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Clear your safety score, points, and trip history back to the demo baseline.
              </p>
            </div>
            <button
              onClick={() => {
                resetDemoData();
                toast.warning("Demo data reset", { description: "Score and points restored to baseline." });
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-danger/40 bg-danger/10 px-4 py-2 text-sm font-semibold text-danger transition-colors hover:bg-danger/20"
            >
              <SettingsIcon className="h-4 w-4" /> Reset Data
            </button>
          </div>
        </Panel>
      </div>
    </AppShell>
  );
}
