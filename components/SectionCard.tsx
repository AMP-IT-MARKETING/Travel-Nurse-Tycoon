import type { PropsWithChildren, ReactNode } from "react";
import clsx from "classnames";

export type SectionCardProps = PropsWithChildren<{
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  subtle?: boolean;
}>;

export function SectionCard({
  title,
  icon,
  action,
  subtle = false,
  children,
}: SectionCardProps) {
  return (
    <section
      className={clsx(
        "rounded-3xl border p-5 shadow-soft-xl",
        subtle ? "border-surface-100 bg-white/40" : "border-white bg-white",
      )}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-base font-semibold">
          {icon}
          <span>{title}</span>
        </div>
        {action}
      </header>
      <div className="space-y-3 text-sm text-slate-600">{children}</div>
    </section>
  );
}
