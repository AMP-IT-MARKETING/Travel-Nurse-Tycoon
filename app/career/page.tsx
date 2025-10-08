"use client";

import { SectionCard } from "@/components/SectionCard";
import { ProgressRing } from "@/components/ProgressRing";
import { useNurseStore } from "@/lib/store";

function progressFromStatus(status: string, eta?: number) {
  if (status === "Ready" || status === "Active") return 1;
  if (status === "In Progress") return eta ? Math.max(0.4, 1 - eta / 14) : 0.5;
  return 0.2;
}

export default function CareerPage() {
  const { player, licenses, certs, offers, reputation } = useNurseStore();
  const ehrExperience = Array.from(new Set(offers.map((offer) => offer.ehr)));
  const trendIcon = {
    up: "📈",
    steady: "➖",
    down: "📉",
  } as const;

  return (
    <main className="space-y-6 pb-8">
      <SectionCard title="Licensure" icon={<span aria-hidden>🗺️</span>}>
        <div className="grid gap-3 sm:grid-cols-3">
          {licenses.map((license) => (
            <div
              key={license.state}
              className="rounded-3xl border border-brand-ocean/10 bg-white p-4 text-sm text-brand-ocean/80"
            >
              <p className="text-xs uppercase tracking-wide text-brand-ocean/60">
                {license.state}
              </p>
              <p className="mt-1 text-base font-semibold text-brand-ocean">
                {license.status}
              </p>
              {license.etaDays && (
                <p className="mt-2 text-xs text-brand-ocean/60">
                  ETA {license.etaDays} days
                </p>
              )}
            </div>
          ))}
        </div>
        {!player.nlc && (
          <p className="mt-3 rounded-3xl bg-brand-primary/10 p-3 text-xs text-brand-primary">
            Complete the compact license to unlock 30+ states instantly.
          </p>
        )}
      </SectionCard>
      <SectionCard title="Certifications" icon={<span aria-hidden>🎓</span>}>
        <div className="flex flex-wrap gap-6">
          {certs.map((cert) => (
            <ProgressRing
              key={cert.id}
              label={cert.name}
              progress={progressFromStatus(cert.status, cert.etaDays)}
              accent={cert.status === "Queued" ? "warning" : "success"}
            />
          ))}
        </div>
      </SectionCard>
      <SectionCard title="Experience" icon={<span aria-hidden>💻</span>} subtle>
        <p className="text-sm text-brand-ocean/80">
          Primary specialty: {player.specialty}
        </p>
        <p className="text-sm text-brand-ocean/80">
          EHRs mastered: {ehrExperience.join(", ")}
        </p>
      </SectionCard>
      <SectionCard title="Reputation & network" icon={<span aria-hidden>🤝</span>} subtle>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-brand-ocean/60">Agencies</p>
            {reputation.agencies.map((agency) => (
              <div
                key={agency.id}
                className="flex items-center justify-between rounded-3xl border border-brand-ocean/10 bg-white px-4 py-3 text-sm text-brand-ocean/80"
              >
                <span className="font-semibold text-brand-ocean">{agency.name}</span>
                <span className="text-xs font-semibold text-brand-primary">
                  {agency.score} • {trendIcon[agency.trend]}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wide text-brand-ocean/60">Facilities</p>
            {reputation.facilities.map((facility) => (
              <div
                key={facility.id}
                className="flex items-center justify-between rounded-3xl border border-brand-ocean/10 bg-white px-4 py-3 text-sm text-brand-ocean/80"
              >
                <span className="font-semibold text-brand-ocean">{facility.name}</span>
                <span className="text-xs font-semibold text-brand-primary">
                  {facility.score} • {trendIcon[facility.trend]}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 text-xs text-brand-ocean/60">
          AMP boosts faster offer turnarounds when reputation stays high—keep communication tight for bonus leads.
        </p>
      </SectionCard>
    </main>
  );
}
