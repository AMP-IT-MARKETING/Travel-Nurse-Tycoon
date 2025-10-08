"use client";

import { SectionCard } from "@/components/SectionCard";
import { MessageList } from "@/components/MessageList";
import { useNurseStore } from "@/lib/store";

export default function MessagesPage() {
  const { messages } = useNurseStore();

  return (
    <main className="space-y-6 pb-8">
      <SectionCard title="Inbox" icon={<span aria-hidden>💬</span>}>
        <MessageList messages={messages} />
      </SectionCard>
      <SectionCard title="Tone" icon={<span aria-hidden>✨</span>} subtle>
        <p className="text-sm text-brand-ocean/80">
          Messages are written with friendly agency partners in mind. Expect gentle reminders and quick recoveries—never punitive notes.
        </p>
      </SectionCard>
    </main>
  );
}
