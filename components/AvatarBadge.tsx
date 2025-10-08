"use client";

import clsx from "classnames";
import type { AvatarConfig } from "@/lib/types";

type AvatarBadgeProps = {
  avatar: AvatarConfig;
  mood: "rested" | "steady" | "fatigued";
};

const moodIcon: Record<AvatarBadgeProps["mood"], string> = {
  rested: "🙂",
  steady: "😐",
  fatigued: "😴",
};

const moodCopy: Record<AvatarBadgeProps["mood"], string> = {
  rested: "Rested",
  steady: "Steady",
  fatigued: "Fatigued",
};

export function AvatarBadge({ avatar, mood }: AvatarBadgeProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-14 w-14">
        <span
          className="absolute inset-0 rounded-full border-4 border-white shadow-soft-xl"
          style={{ backgroundColor: avatar.scrubsColor }}
        />
        <span
          className="absolute inset-0 flex items-center justify-center text-2xl"
          aria-hidden
        >
          {moodIcon[mood]}
        </span>
        <span
          className="absolute left-0 top-0 h-3 w-3 -translate-x-1/4 -translate-y-1/4 rounded-full border-2 border-white"
          style={{ backgroundColor: avatar.skinTone }}
          aria-hidden
        />
        {avatar.accessory && (
          <span
            className={clsx(
              "absolute -bottom-2 right-0 rounded-full border border-white bg-white px-2 py-1 text-[10px] font-semibold text-brand-ocean",
              avatar.accessory === "stethoscope" && "shadow-soft-xl",
            )}
          >
            {avatar.accessory === "stethoscope" ? "🩺" : "🪪"}
          </span>
        )}
      </div>
      <div className="text-sm text-brand-ocean">
        <p className="text-xs uppercase tracking-wide text-brand-ocean/60">Mood</p>
        <p className="font-semibold">{moodCopy[mood]}</p>
      </div>
    </div>
  );
}
