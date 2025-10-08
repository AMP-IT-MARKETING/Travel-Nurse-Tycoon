"use client";

import clsx from "classnames";
import { useNurseStore } from "@/lib/store";

export function QuestList() {
  const { dailyQuests, completeQuest, updateQuestProgress } = useNurseStore();

  return (
    <ul className="space-y-3">
      {dailyQuests.map((quest) => {
        const progress = quest.target === 0 ? 1 : quest.progress / quest.target;
        const canComplete = quest.progress >= quest.target;
        return (
          <li
            key={quest.id}
            className="flex flex-col gap-3 rounded-3xl border border-brand-ocean/10 bg-white/80 p-4 shadow-soft-xl sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <p className="text-sm font-semibold text-brand-ocean">{quest.name}</p>
              {quest.description && (
                <p className="text-xs text-brand-ocean/60">{quest.description}</p>
              )}
              <p className="text-xs font-medium text-brand-primary">
                +{quest.xpReward} XP • {Math.min(quest.progress, quest.target)} / {quest.target}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-28 rounded-full bg-brand-ocean/10">
                <div
                  className="h-2 rounded-full bg-brand-primary transition-all duration-500 ease-out"
                  style={{ width: `${Math.min(1, progress) * 100}%` }}
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  if (quest.completed) return;
                  if (canComplete) {
                    completeQuest(quest.id);
                  } else {
                    updateQuestProgress(quest.id, quest.progress + 1);
                  }
                }}
                disabled={quest.completed}
                className={clsx(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  quest.completed
                    ? "bg-brand-primary/10 text-brand-primary/70"
                    : canComplete
                      ? "bg-brand-primary text-white hover:bg-brand-success"
                      : "bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/20",
                )}
              >
                {quest.completed ? "Done" : canComplete ? "Complete" : "+1 progress"}
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
