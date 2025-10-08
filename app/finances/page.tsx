"use client";

import { SectionCard } from "@/components/SectionCard";
import { ProgressRing } from "@/components/ProgressRing";
import { PayBreakdown } from "@/components/PayBreakdown";
import { TaxSettingsPanel } from "@/components/TaxSettingsPanel";
import { useNurseStore } from "@/lib/store";

export default function FinancesPage() {
  const { ledger, goals, taxSettings } = useNurseStore();

  return (
    <main className="space-y-6 pb-8">
      <SectionCard title="Weekly payday" icon={<span aria-hidden>💵</span>}>
        <PayBreakdown ledger={ledger} taxSettings={taxSettings} />
      </SectionCard>
      <SectionCard title="Goals" icon={<span aria-hidden>🎯</span>} subtle>
        <div className="flex flex-wrap gap-6">
          {goals.map((goal) => (
            <ProgressRing
              key={goal.id}
              label={goal.name}
              progress={goal.saved / goal.target}
              accent="primary"
            />
          ))}
        </div>
      </SectionCard>
      <SectionCard
        title="Tax preview"
        icon={<span aria-hidden>🧮</span>}
        subtle
      >
        <TaxSettingsPanel />
      </SectionCard>
    </main>
  );
}
