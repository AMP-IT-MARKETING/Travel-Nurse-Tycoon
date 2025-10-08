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
            "flex h-full flex-col justify-between gap-3 rounded-2xl border p-4 text-left shadow-sm transition",
            task.status === "approved"
              ? "border-brand-success/50 bg-brand-success/10"
              : "border-slate-200 hover:border-brand-primary/40 hover:shadow-soft-xl",
          )}
        >
          <div>
            <p className="text-sm font-semibold text-slate-800">{task.name}</p>
            <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
              {statusLabels[task.status]}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
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
