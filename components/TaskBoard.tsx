"use client";

import { useNurseStore } from "@/lib/store";
import clsx from "classnames";

const statusLabels: Record<string, string> = {
  "to-collect": "To collect",
  "in-review": "In review",
  approved: "Approved",
};

export function TaskBoard() {
  const { tasks, advanceTask } = useNurseStore();

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {tasks.map((task) => (
        <button
          key={task.id}
          onClick={() => advanceTask(task.id)}
          className={clsx(
            "flex h-full flex-col justify-between gap-3 rounded-3xl border p-4 text-left shadow-sm transition",
            task.status === "approved"
              ? "border-brand-success/40 bg-brand-success/10"
              : "border-brand-ocean/10 hover:border-brand-primary/30 hover:shadow-soft-xl",
          )}
        >
          <div>
            <p className="text-sm font-semibold text-brand-ocean">{task.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-brand-ocean/60">
              {statusLabels[task.status]}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-brand-ocean/70">
            <span>{task.type}</span>
            <span>
              {task.status === "approved" ? "Ready" : `${task.etaHours}h ETA`}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
