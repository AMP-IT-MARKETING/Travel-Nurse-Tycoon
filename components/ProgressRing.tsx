import clsx from "classnames";

type ProgressRingProps = {
  label: string;
  progress: number; // 0-1
  size?: "sm" | "md";
  accent?: "primary" | "success" | "warning";
};

export function ProgressRing({
  label,
  progress,
  size = "md",
  accent = "primary",
}: ProgressRingProps) {
  const dimension = size === "sm" ? 72 : 96;
  const strokeWidth = 10;
  const radius = (dimension - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));
  const color = {
    primary: "stroke-brand-primary",
    success: "stroke-brand-success",
    warning: "stroke-brand-warning",
  }[accent];

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <svg
        width={dimension}
        height={dimension}
        className="-rotate-90"
        role="img"
        aria-label={label}
      >
        <circle
          className="stroke-brand-ocean/15"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={dimension / 2}
          cy={dimension / 2}
        />
        <circle
          className={clsx("transition-all duration-500 ease-out", color)}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={dimension / 2}
          cy={dimension / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className="text-xs font-medium uppercase tracking-wide text-brand-ocean/60">
        {label}
      </span>
      <span className="text-sm font-semibold text-brand-ocean">
        {Math.round(progress * 100)}%
      </span>
    </div>
  );
}
