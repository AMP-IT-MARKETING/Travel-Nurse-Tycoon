"use client";

import { useMemo } from "react";
import { useNurseStore } from "@/lib/store";
import { EnergyBar } from "@/components/EnergyBar";
import { AvatarBadge } from "@/components/AvatarBadge";
import { SelfCareToggle } from "@/components/SelfCareToggle";

export function TodayCard() {
  const { player, shifts, energyTrend, levelState } = useNurseStore();
  const nextShift = shifts[0];
  const mood: "rested" | "steady" | "fatigued" = useMemo(() => {
    if (player.energy >= 70 && player.morale >= 70) return "rested";
    if (player.energy < 45 || player.morale < 45) return "fatigued";
    return "steady";
  }, [player.energy, player.morale]);
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
    <div className="space-y-4 rounded-4xl bg-gradient-to-br from-brand-primary/10 via-white to-brand-success/15 p-6 shadow-soft-xl">
      <div className="flex flex-col gap-4 text-sm sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <AvatarBadge avatar={player.avatar} mood={mood} />
          <div>
            <p className="text-xs uppercase tracking-wider text-brand-ocean/60">
              Today
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-brand-ocean">
              Hi {player.name}, here&apos;s the plan.
            </h2>
            <p className="mt-1 text-xs font-semibold text-brand-primary">
              Level {levelState.level} · {levelState.title}
            </p>
          </div>
        </div>
        <div className="text-right text-xs text-brand-ocean/70">
          <p className="uppercase tracking-wide">Next shift</p>
          <p className="font-semibold text-brand-ocean">
            {nextShift.day} • {nextShift.start}
          </p>
          <p>{nextShift.unit}</p>
        </div>
      </div>
      <EnergyBar energy={player.energy} trend={energyTrend} />
      <div className="rounded-3xl bg-white/80 p-4 text-sm text-brand-ocean/80 shadow-inner">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">
              Smart suggestion
            </p>
            <p className="mt-2 leading-relaxed">{suggestion}</p>
          </div>
          <SelfCareToggle />
        </div>
        <p className="mt-3 text-[11px] text-brand-ocean/60">
          Auto self-care nudges rest, meals, and stretching so energy stays contract-ready.
        </p>
      </div>
    </div>
  );
}
