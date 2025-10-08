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
  const { player, licenses, certs, offers } = useNurseStore();
  const ehrExperience = Array.from(new Set(offers.map((offer) => offer.ehr)));

  return (
    <main className="space-y-6 pb-8">
      <SectionCard title="Licensure" icon={<span aria-hidden>🗺️</span>}>
        <div className="grid gap-3 sm:grid-cols-3">
          {licenses.map((license) => (
            <div
              key={license.state}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600"
            >
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {license.state}
              </p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                {license.status}
              </p>
              {license.etaDays && (
                <p className="mt-2 text-xs text-slate-500">
                  ETA {license.etaDays} days
                </p>
              )}
            </div>
          ))}
        </div>
        {!player.nlc && (
          <p className="mt-3 rounded-2xl bg-brand-primary/10 p-3 text-xs text-brand-primary">
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
        <p className="text-sm text-slate-600">
          Primary specialty: {player.specialty}
        </p>
        <p className="text-sm text-slate-600">
          EHRs mastered: {ehrExperience.join(", ")}
        </p>
      </SectionCard>
    </main>
  );
}
