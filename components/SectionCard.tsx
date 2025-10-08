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
        "rounded-4xl border p-5 shadow-soft-xl",
        subtle
          ? "border-brand-ocean/5 bg-white/70"
          : "border-brand-ocean/10 bg-white",
      )}
    >
      <header className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-base font-semibold text-brand-ocean">
          {icon}
          <span>{title}</span>
        </div>
        {action}
      </header>
      <div className="space-y-3 text-sm text-brand-ocean/80">{children}</div>
    </section>
  );
}
