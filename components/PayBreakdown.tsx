import type { LedgerEntry } from "@/lib/types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

type PayBreakdownProps = {
  ledger: LedgerEntry[];
};

export function PayBreakdown({ ledger }: PayBreakdownProps) {
  const totals = ledger.reduce(
    (acc, entry) => {
      if (entry.type === "pay") acc.pay += entry.amount;
      if (entry.type === "expense") acc.expenses += Math.abs(entry.amount);
      if (entry.type === "bonus") acc.bonus += entry.amount;
      acc.net += entry.amount;
      return acc;
    },
    { pay: 0, expenses: 0, bonus: 0, net: 0 },
  );

  return (
    <div className="space-y-4 text-sm text-slate-600">
      <dl className="space-y-2">
        {ledger.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-xl bg-surface-100 px-4 py-3"
          >
            <dt className="font-medium text-slate-700">{entry.label}</dt>
            <dd
              className={
                entry.amount >= 0
                  ? "font-semibold text-brand-success"
                  : "font-semibold text-rose-500"
              }
            >
              {formatCurrency(entry.amount)}
            </dd>
          </div>
        ))}
      </dl>
      <div className="rounded-2xl bg-slate-900 px-4 py-5 text-white">
        <p className="text-xs uppercase tracking-wide text-slate-200">
          Weekly take-home (est)
        </p>
        <p className="mt-1 text-2xl font-bold">{formatCurrency(totals.net)}</p>
        <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
          <div>
            <p className="text-slate-300">Taxed pay</p>
            <p className="text-white">{formatCurrency(totals.pay)}</p>
          </div>
          <div>
            <p className="text-slate-300">Stipends</p>
            <p className="text-white">
              {formatCurrency(
                ledger
                  .filter((e) => e.label.includes("stipend"))
                  .reduce((sum, e) => sum + e.amount, 0),
              )}
            </p>
          </div>
          <div>
            <p className="text-slate-300">Expenses</p>
            <p className="text-white">{formatCurrency(totals.expenses)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
