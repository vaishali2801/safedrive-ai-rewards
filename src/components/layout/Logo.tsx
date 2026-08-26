import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <Link to="/" className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-safe/15 text-safe shadow-[0_0_18px_-4px_var(--safe)]">
        <ShieldCheck className="h-5 w-5" />
      </span>
      {!compact ? (
        <span className="truncate text-lg font-bold tracking-tight">
          SAFE<span className="text-safe">drive</span>X
        </span>
      ) : null}
    </Link>
  );
}
