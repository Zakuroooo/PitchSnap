import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
  /** Controls the max-width of the container */
  size?: "sm" | "md" | "lg" | "xl" | "full"
}

const sizeMap: Record<NonNullable<ContainerProps["size"]>, string> = {
  sm:   "max-w-2xl",
  md:   "max-w-4xl",
  lg:   "max-w-5xl",
  xl:   "max-w-7xl",
  full: "max-w-none",
}

/**
 * Responsive container with horizontal padding.
 * Defaults to xl (max-w-7xl) — the standard page width.
 */
export default function Container({
  children,
  className,
  size = "xl",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        sizeMap[size],
        className,
      )}
    >
      {children}
    </div>
  )
}
