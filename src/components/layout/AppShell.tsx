import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  Bell,
  Gauge,
  History,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Trophy,
  User,
  Gift,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LiveDot } from "@/components/safety/primitives";
import { useSafety } from "@/context/SafetyProvider";
import { Logo } from "@/components/layout/Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/live-monitoring", label: "Live Monitoring", icon: Activity },
  { to: "/safety-score", label: "Safety Score", icon: Gauge },
  { to: "/history", label: "Driving History", icon: History },
  { to: "/rewards", label: "Rewards", icon: Gift },
  { to: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { to: "/emergency", label: "Emergency SOS", icon: LifeBuoy },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { points, alerts } = useSafety();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const sidebar = (
    <nav className="flex h-full flex-col gap-1 p-3" aria-label="Main navigation">
      {nav.map((item) => {
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={() => setOpen(false)}
            className={cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-safe/12 text-safe shadow-[inset_0_0_0_1px_var(--sidebar-border)]"
                : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            )}
          >
            <item.icon className={cn("h-4.5 w-4.5 shrink-0", active && "drop-shadow-[0_0_6px_var(--safe)]")} />
            <span className="truncate">{item.label}</span>
            {active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-safe" /> : null}
          </Link>
        );
      })}
      <div className="mt-auto space-y-1 border-t border-sidebar-border pt-3">
        <Link
          to="/admin"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-info/85 transition-colors hover:bg-sidebar-accent"
        >
          <ShieldCheck className="h-4.5 w-4.5 shrink-0" />
          Admin Console
        </Link>
        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent">
          <Settings className="h-4.5 w-4.5 shrink-0" />
          Settings
        </button>
        <Link
          to="/login"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-danger/80 transition-colors hover:bg-danger/10"
        >
          <LogOut className="h-4.5 w-4.5 shrink-0" />
          Logout
        </Link>
      </div>
    </nav>
  );

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <button
              className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border lg:hidden"
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4.5 w-4.5" />
            </button>
            <Logo />
            <span className="ml-2 hidden items-center gap-2 rounded-full border border-safe/25 bg-safe/10 px-3 py-1 md:inline-flex">
              <LiveDot label="System Online" />
            </span>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden rounded-full border border-info/25 bg-info/10 px-3 py-1.5 text-xs font-semibold text-info sm:block">
              {points.toLocaleString("en-IN")} PTS
            </div>
            <button
              className="relative grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4.5 w-4.5" />
              {alerts.length > 0 ? (
                <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-safe px-1 text-[10px] font-bold text-safe-foreground">
                  {alerts.length}
                </span>
              ) : null}
            </button>
            <Link
              to="/profile"
              className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:border-safe/40"
            >
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-safe/20 text-xs font-bold text-safe">
                V
              </span>
              <span className="hidden text-sm font-medium sm:block">Vaishali</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-[65px] hidden h-[calc(100vh-65px)] w-64 shrink-0 border-r border-sidebar-border bg-sidebar/60 backdrop-blur-xl lg:block">
          {sidebar}
        </aside>

        <AnimatePresence>
          {open ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            >
              <motion.aside
                initial={{ x: -300 }}
                animate={{ x: 0 }}
                exit={{ x: -300 }}
                transition={{ type: "spring", damping: 26, stiffness: 240 }}
                className="h-full w-72 border-r border-sidebar-border bg-sidebar"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between border-b border-sidebar-border p-4">
                  <Logo />
                  <button aria-label="Close navigation" onClick={() => setOpen(false)}>
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="h-[calc(100%-65px)]">{sidebar}</div>
              </motion.aside>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="min-w-0 flex-1 px-4 pb-24 pt-6 lg:px-8 lg:pb-10">{children}</main>
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-background/95 backdrop-blur-xl lg:hidden"
        aria-label="Bottom navigation"
      >
        {nav.slice(0, 5).map((item) => {
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium",
                active ? "text-safe" : "text-muted-foreground",
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label.split(" ")[0]}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
