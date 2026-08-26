import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "@/components/layout/Logo";
import { StatusBadge } from "@/components/safety/primitives";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register Your Vehicle — SAFEdriveX" },
      { name: "description", content: "Create a SAFEdriveX driver profile, register your vehicle and start earning points for safe driving." },
      { property: "og:title", content: "Register Your Vehicle — SAFEdriveX" },
      { property: "og:description", content: "Join the AI road-safety reward network in under a minute." },
    ],
  }),
  component: RegisterPage,
});

const fields = [
  { key: "name", label: "Full Name", placeholder: "Vaishali Chauhan", type: "text" },
  { key: "email", label: "Email", placeholder: "you@example.com", type: "email" },
  { key: "phone", label: "Mobile Number", placeholder: "+91 98XXX XXXXX", type: "tel" },
  { key: "vehicle", label: "Vehicle Number", placeholder: "GJ-04-XX-7788", type: "text" },
  { key: "license", label: "Driving Licence", placeholder: "GJ04 2019 0071234", type: "text" },
  { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
] as const;

function RegisterPage() {
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("Motorcycle");

  return (
    <div className="grid-lines flex min-h-screen items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel w-full max-w-2xl p-7"
      >
        <div className="flex items-center justify-between">
          <Logo />
          <StatusBadge tone="safe">Free Enrollment</StatusBadge>
        </div>
        <h1 className="mt-7 text-2xl font-bold tracking-tight">Register your vehicle</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Link your vehicle to the SAFEdriveX AI safety network.
        </p>

        <form
          className="mt-6 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Vehicle registered. Welcome to SAFEdriveX!");
            navigate({ to: "/dashboard" });
          }}
        >
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {f.label}
              </span>
              <input
                type={f.type}
                placeholder={f.placeholder}
                className="mt-1.5 w-full rounded-xl border border-input bg-surface px-4 py-2.5 text-sm outline-none focus:border-safe/60"
                required
              />
            </label>
          ))}
          <div className="sm:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Vehicle Type
            </span>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Motorcycle", "Car", "Auto", "Commercial"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setVehicleType(t)}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-colors ${
                    vehicleType === t
                      ? "border-safe/50 bg-safe/12 text-safe"
                      : "border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-safe py-3 text-sm font-bold text-safe-foreground transition-transform hover:scale-[1.02] sm:col-span-2"
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-muted-foreground">
          Already registered?{" "}
          <Link to="/login" className="font-semibold text-safe hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
