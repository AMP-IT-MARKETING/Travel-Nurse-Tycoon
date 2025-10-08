"use client";

import clsx from "classnames";
import { useMemo } from "react";
import type { Offer } from "@/lib/types";
import { useNurseStore } from "@/lib/store";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function OfferCard({ offer }: { offer: Offer }) {
  const { selectedOfferId, selectOffer } = useNurseStore();
  const totalWeekly = useMemo(
    () => offer.baseRate * 36 + offer.stipendHousing + offer.stipendMIE,
    [offer],
  );

  return (
    <button
      className={clsx(
        "w-full rounded-4xl border p-5 text-left shadow-soft-xl transition focus:outline-none",
        selectedOfferId === offer.id
          ? "border-brand-primary bg-brand-primary/5"
          : "border-brand-ocean/10 bg-white hover:border-brand-primary/30",
      )}
      onClick={() => selectOffer(offer.id)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-brand-ocean/70">
            {offer.city}, {offer.state}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-brand-ocean">
            {offer.unit} • {offer.shift}
          </h3>
          <p className="mt-1 text-xs uppercase tracking-wider text-brand-primary">
            Match {offer.matchScore}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-ocean/60">
            Weekly total
          </p>
          <p className="text-xl font-bold text-brand-ocean">
            {formatCurrency(totalWeekly)}
          </p>
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs text-brand-ocean/70 sm:grid-cols-4">
        <div>
          <dt className="font-semibold text-brand-ocean/70">Base (36h)</dt>
          <dd>{formatCurrency(offer.baseRate * 36)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-ocean/70">Housing stipend</dt>
          <dd>{formatCurrency(offer.stipendHousing)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-ocean/70">M&amp;IE</dt>
          <dd>{formatCurrency(offer.stipendMIE)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-brand-ocean/70">Housing difficulty</dt>
          <dd>{"⭐".repeat(offer.housingDifficulty)}</dd>
        </div>
      </dl>
      <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-brand-ocean/70">
        {offer.agencies.map((agency) => (
          <span
            key={agency.id}
            className={clsx(
              "rounded-full border px-3 py-1",
              agency.featured
                ? "border-brand-primary/40 bg-brand-primary/10 text-brand-primary"
                : "border-brand-ocean/15",
            )}
          >
            {agency.name}
          </span>
        ))}
        {offer.blockers.length > 0 && (
          <span className="ml-auto rounded-full bg-brand-warning/15 px-3 py-1 font-medium text-brand-warning">
            Blockers: {offer.blockers.join(", ")}
          </span>
        )}
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wide text-brand-ocean/50">
        Base pay is taxed; stipends are non-taxed (simplified).
      </p>
    </button>
  );
}
