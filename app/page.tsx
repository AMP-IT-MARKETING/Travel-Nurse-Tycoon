"use client";

import { TodayCard } from "@/components/TodayCard";
import { SectionCard } from "@/components/SectionCard";
import { TaskBoard } from "@/components/TaskBoard";
import { LevelProgress } from "@/components/LevelProgress";
import { QuestList } from "@/components/QuestList";
export default function HomePage() {
  return (
    <main className="space-y-6 pb-8">
      <TodayCard />
      <SectionCard title="Level & unlocks" icon={<span aria-hidden>🎖️</span>}>
        <LevelProgress />
      </SectionCard>
      <SectionCard
        title="Daily quests"
        icon={<span aria-hidden>📋</span>}
        action={<span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">+15 XP avg</span>}
      >
        <QuestList />
      </SectionCard>
      <SectionCard title="Credential board" icon={<span aria-hidden>📋</span>}>
        <TaskBoard />
      </SectionCard>
      <SectionCard title="This week" icon={<span aria-hidden>🗓️</span>} subtle>
        <p>
          Three night shifts on deck with Friday clear—perfect to tackle housing tours and keep energy trending high.
        </p>
        <p>
          License board expects an update in 5 days. Stay responsive for that approval bump and watch for AMP&apos;s early renewal ping.
        </p>
      </SectionCard>
    </main>
  );
}
