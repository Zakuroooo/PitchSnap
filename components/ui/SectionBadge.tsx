import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  label: string;
  className?: string;
}

export function SectionBadge({ label, className }: SectionBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 uppercase font-semibold text-[11px] tracking-[0.12em]",
        className
      )}
      style={{ color: "var(--color-accent)" }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "var(--color-accent)" }}
      ></span>
      {label}
    </div>
  );
}
