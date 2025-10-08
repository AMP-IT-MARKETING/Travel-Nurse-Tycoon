"use client";

import { useNurseStore } from "@/lib/store";

export function TaxSettingsPanel() {
  const {
    taxSettings,
    setFederalRate,
    setStateRate,
    toggleFica,
    toggleSelfEmployed,
  } = useNurseStore();

  return (
    <div className="space-y-4 text-sm text-brand-ocean/80">
      <label className="block space-y-2">
        <span className="flex items-center justify-between text-xs uppercase tracking-wide text-brand-ocean/60">
          Federal rate preview
          <span className="text-brand-ocean">{taxSettings.federalRate}%</span>
        </span>
        <input
          type="range"
          min={10}
          max={37}
          step={1}
          value={taxSettings.federalRate}
          onChange={(event) => setFederalRate(Number(event.target.value))}
          className="w-full accent-brand-primary"
        />
      </label>
      <label className="block space-y-2">
        <span className="flex items-center justify-between text-xs uppercase tracking-wide text-brand-ocean/60">
          State rate
          <span className="text-brand-ocean">{taxSettings.stateRate}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={10}
          step={1}
          value={taxSettings.stateRate}
          onChange={(event) => setStateRate(Number(event.target.value))}
          className="w-full accent-brand-primary"
        />
      </label>
      <div className="flex flex-wrap gap-3 text-xs">
        <label className="flex items-center gap-2 rounded-full border border-brand-ocean/15 bg-white px-3 py-2 font-semibold">
          <input
            type="checkbox"
            checked={taxSettings.includeFica}
            onChange={toggleFica}
            className="h-4 w-4 rounded border-brand-ocean/30 text-brand-primary focus:ring-brand-primary"
          />
          Include FICA (7.65%)
        </label>
        <label className="flex items-center gap-2 rounded-full border border-brand-ocean/15 bg-white px-3 py-2 font-semibold">
          <input
            type="checkbox"
            checked={taxSettings.selfEmployed}
            onChange={toggleSelfEmployed}
            className="h-4 w-4 rounded border-brand-ocean/30 text-brand-primary focus:ring-brand-primary"
          />
          Self-employed mode (15.3%)
        </label>
      </div>
      <p className="text-[11px] text-brand-ocean/60">
        Educational preview only—not tax advice.
      </p>
    </div>
  );
}
