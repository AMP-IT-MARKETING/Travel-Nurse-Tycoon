"use client";

import clsx from "classnames";
import { useNurseStore } from "@/lib/store";

export function SelfCareToggle() {
  const { autoSelfCare, toggleSelfCare } = useNurseStore();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={autoSelfCare}
      onClick={toggleSelfCare}
      className={clsx(
        "flex items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold transition focus:outline-none",
        autoSelfCare
          ? "border-brand-primary/40 bg-brand-primary/10 text-brand-primary"
          : "border-brand-ocean/20 bg-white text-brand-ocean/80 hover:border-brand-primary/30",
      )}
    >
      <span
        className={clsx(
          "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
          autoSelfCare
            ? "border-brand-primary bg-brand-primary text-white"
            : "border-brand-ocean/40 text-brand-ocean/60",
        )}
        aria-hidden
      >
        {autoSelfCare ? "●" : ""}
      </span>
      <span>Auto self-care</span>
    </button>
  );
}
