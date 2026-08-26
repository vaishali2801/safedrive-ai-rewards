import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { StatusBadge } from "@/components/safety/primitives";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Driver Login — SAFEdriveX" },
      { name: "description", content: "Sign in to your SAFEdriveX driver dashboard to view your safety score, alerts and reward points." },
      { property: "og:title", content: "Driver Login — SAFEdriveX" },
      { property: "og:description", content: "Access your AI road-safety dashboard and reward wallet." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("vaishali@safedrivex.io");
  const [password, setPassword] = useState("demo1234");

  return (
    <div className="grid-lines flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-md p-7"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <StatusBadge tone="info">Demo</StatusBadge>
        </div>
        <h1 className="mt-7 text-2xl font-bold tracking-tight">Welcome back, driver</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Sign in to continue your safe-driving streak.
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Signed in — welcome back!");
            navigate({ to: "/dashboard" });
          }}
        >
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-input bg-surface px-4 py-2.5 text-sm outline-none focus:border-safe/60"
              required
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-input bg-surface px-4 py-2.5 text-sm outline-none focus:border-safe/60"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-xl bg-safe py-3 text-sm font-bold text-safe-foreground transition-transform hover:scale-[1.02]"
          >
            Login to Dashboard
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          New driver?{" "}
          <Link to="/register" className="font-semibold text-safe hover:underline">
            Create an account
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-muted-foreground/70">
          Prototype only — any credentials work.
        </p>
      </motion.div>
    </div>
  );
}
