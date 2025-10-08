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
            "flex h-full flex-col gap-2 rounded-3xl border p-4 text-left shadow-sm transition focus:outline-none",
            housingTier === option.tier
              ? "border-brand-primary bg-brand-primary/5"
              : "border-brand-ocean/10 hover:border-brand-primary/30",
          )}
        >
          <span className="text-sm font-semibold text-brand-ocean">
            {option.tier}
          </span>
          <p className="text-xs text-brand-ocean/70">{option.description}</p>
        </button>
      ))}
    </div>
  );
}
