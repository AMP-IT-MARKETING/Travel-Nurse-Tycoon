import type { Message } from "@/lib/types";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul className="space-y-3 text-sm text-brand-ocean/80">
      {messages.map((message) => (
        <li
          key={message.id}
          className="rounded-3xl border border-brand-ocean/10 bg-white p-4 shadow-soft-xl"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-brand-ocean/60">
            <span>{message.sender}</span>
            <span>{message.time}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-brand-ocean">
            {message.subject}
          </h3>
          <p className="mt-2 leading-relaxed">{message.body}</p>
        </li>
      ))}
    </ul>
  );
}
