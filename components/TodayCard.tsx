"use client";

import { useMemo } from "react";
import { useNurseStore } from "@/lib/store";
import { EnergyBar } from "@/components/EnergyBar";

export function TodayCard() {
  const { player, shifts, energyTrend } = useNurseStore();
  const nextShift = shifts[0];
  const suggestion = useMemo(() => {
    if (player.energy < 60) {
      return "Queue a rest day or light housing task to recharge before the next stretch.";
    }
    if (player.morale < 70) {
      return "Boost morale with a premium housing search or a day off with friends.";
    }
    return "Knock out license paperwork today so your LA offer can lock in.";
  }, [player.energy, player.morale]);

  return (
    <div className="space-y-4 rounded-3xl bg-gradient-to-br from-brand-primary/10 via-white to-brand-success/10 p-6 shadow-soft-xl">
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Today
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Hi {player.name}, here&apos;s the plan.
          </h2>
        </div>
        <div className="text-right text-xs text-slate-500">
          <p>Next shift</p>
          <p className="font-semibold text-slate-900">
            {nextShift.day} • {nextShift.start}
          </p>
          <p>{nextShift.unit}</p>
        </div>
      </div>
      <EnergyBar energy={player.energy} trend={energyTrend} />
      <div className="rounded-2xl bg-white/80 p-4 text-sm text-slate-700 shadow-inner">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
          Smart suggestion
        </p>
        <p className="mt-2 leading-relaxed">{suggestion}</p>
      </div>
    </div>
  );
}
