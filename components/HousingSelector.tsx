"use client";

import { useNurseStore, type HousingTier } from "@/lib/store";
import clsx from "classnames";

const OPTIONS: { tier: HousingTier; description: string }[] = [
  { tier: "Frugal", description: "Shared space, short commute, morale +5" },
  { tier: "Standard", description: "1-bed near hospital, morale +10" },
  { tier: "Premium", description: "Boutique loft, morale +15" },
];

export function HousingSelector() {
  const { housingTier, chooseHousing } = useNurseStore();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {OPTIONS.map((option) => (
        <button
          key={option.tier}
          onClick={() => chooseHousing(option.tier)}
          className={clsx(
            "flex h-full flex-col gap-2 rounded-2xl border p-4 text-left shadow-sm transition focus:outline-none",
            housingTier === option.tier
              ? "border-brand-primary bg-surface-100"
              : "border-slate-200 hover:border-brand-primary/40",
          )}
        >
          <span className="text-sm font-semibold text-slate-800">
            {option.tier}
          </span>
          <p className="text-xs text-slate-500">{option.description}</p>
        </button>
      ))}
    </div>
  );
}
