import clsx from "classnames";

type EnergyBarProps = {
  energy: number;
  trend: "low" | "stable" | "high";
};

export function EnergyBar({ energy, trend }: EnergyBarProps) {
  const color =
    trend === "high"
      ? "bg-brand-success"
      : trend === "low"
        ? "bg-brand-warning"
        : "bg-brand-primary";

  return (
    <div className="w-full">
      <div className="mb-1 flex items-center justify-between text-xs font-semibold text-brand-ocean/70">
        <span>Energy</span>
        <span>{energy}%</span>
      </div>
      <div className="h-2 rounded-full bg-brand-ocean/10">
        <div
          className={clsx(
            "h-2 rounded-full transition-all duration-500 ease-out",
            color,
          )}
          style={{ width: `${Math.min(100, Math.max(0, energy))}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-brand-ocean/70">
        {trend === "low" &&
          "Low energy can reduce offer acceptance. Schedule recovery time."}
        {trend === "stable" &&
          "Nicely balanced. You can flex between shifts and errands."}
        {trend === "high" &&
          "Rested and ready. Expect better shift performance bonuses."}
      </p>
    </div>
  );
}
