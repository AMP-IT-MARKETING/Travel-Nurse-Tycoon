import type { Message } from "@/lib/types";

export function MessageList({ messages }: { messages: Message[] }) {
  return (
    <ul className="space-y-3 text-sm text-slate-600">
      {messages.map((message) => (
        <li
          key={message.id}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
            <span>{message.sender}</span>
            <span>{message.time}</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-slate-900">
            {message.subject}
          </h3>
          <p className="mt-2 leading-relaxed">{message.body}</p>
        </li>
      ))}
    </ul>
  );
}
