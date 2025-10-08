"use client";

import { OfferCard } from "@/components/OfferCard";
import { SectionCard } from "@/components/SectionCard";
import { HousingSelector } from "@/components/HousingSelector";
import { useNurseStore } from "@/lib/store";

export default function OpportunitiesPage() {
  const { offers } = useNurseStore();

  return (
    <main className="space-y-6 pb-8">
      <SectionCard title="Featured offers" icon={<span aria-hidden>🧭</span>}>
        <div className="space-y-4">
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Housing picks" icon={<span aria-hidden>🏡</span>}>
        <HousingSelector />
        <p className="text-xs text-slate-500">
          Housing tier impacts morale, commute time, and how much stipend you
          pocket each week.
        </p>
      </SectionCard>
    </main>
  );
}
