"use client";

import { TodayCard } from "@/components/TodayCard";
import { SectionCard } from "@/components/SectionCard";
import { TaskBoard } from "@/components/TaskBoard";
export default function HomePage() {
  return (
    <main className="space-y-6 pb-8">
      <TodayCard />
      <SectionCard title="Credential board" icon={<span aria-hidden>📋</span>}>
        <TaskBoard />
      </SectionCard>
      <SectionCard title="This week" icon={<span aria-hidden>🗓️</span>} subtle>
        <p>
          Three night shifts on deck with Friday clear—perfect to tackle housing
          tours.
        </p>
        <p>
          License board expects an update in 5 days. Stay responsive for that
          approval bump.
        </p>
      </SectionCard>
    </main>
  );
}
