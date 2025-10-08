"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Route } from "next";
import clsx from "classnames";

const NAV_ITEMS: { href: Route; label: string; icon: string }[] = [
  { href: "/", label: "Home", icon: "🏠" },
  { href: "/opportunities", label: "Opportunities", icon: "🧭" },
  { href: "/career", label: "Career", icon: "🎓" },
  { href: "/finances", label: "Finances", icon: "💵" },
  { href: "/messages", label: "Messages", icon: "💬" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="sticky bottom-0 mt-auto border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <ul className="mx-auto flex max-w-screen-sm items-center justify-around gap-1 px-2 py-3 text-xs font-medium text-slate-500">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={clsx(
                  "flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition",
                  isActive
                    ? "bg-surface-100 text-brand-primary"
                    : "hover:bg-surface-100",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <span aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
