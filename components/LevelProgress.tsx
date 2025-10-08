"use client";

import { useMemo } from "react";
import { useNurseStore } from "@/lib/store";

export function LevelProgress() {
  const { levelState } = useNurseStore();

  const progress = useMemo(() => {
    if (!levelState.xpToNext || levelState.xpToNext === 0) {
      return 1;
    }
    return Math.min(1, levelState.xpIntoLevel / levelState.xpToNext);
  }, [levelState.xpIntoLevel, levelState.xpToNext]);

  return (
    <div className="space-y-4 text-sm text-brand-ocean/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-brand-ocean/60">
            Level {levelState.level} · {levelState.title}
          </p>
          <p className="mt-1 font-semibold text-brand-ocean">{levelState.unlock}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-semibold text-brand-ocean">
            {Math.round(progress * 100)}% to L
            {levelState.nextLevel ?? levelState.level}
          </p>
          <p className="text-xs text-brand-ocean/60">
            {levelState.xpIntoLevel}
            {levelState.xpToNext ? ` / ${levelState.xpToNext}` : ""} XP
          </p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-brand-ocean/10">
        <div
          className="h-2 rounded-full bg-brand-primary transition-all duration-500 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
      {levelState.nextUnlock && (
        <p className="text-xs text-brand-ocean/60">
          Next: Level {levelState.nextLevel} unlocks {levelState.nextUnlock}
        </p>
      )}
    </div>
  );
}
