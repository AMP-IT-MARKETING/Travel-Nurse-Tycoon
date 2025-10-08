import type { LedgerEntry, TaxSettings } from "@/lib/types";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

type PayBreakdownProps = {
  ledger: LedgerEntry[];
  taxSettings: TaxSettings;
};

export function PayBreakdown({ ledger, taxSettings }: PayBreakdownProps) {
  const taxablePay = ledger
    .filter((entry) => entry.type === "pay" && entry.taxable)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const stipendTotal = ledger
    .filter((entry) => entry.type === "pay" && entry.taxable === false)
    .reduce((sum, entry) => sum + entry.amount, 0);
  const bonusTotal = ledger
    .filter((entry) => entry.type === "bonus")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const expenses = ledger
    .filter((entry) => entry.type === "expense")
    .reduce((sum, entry) => sum + Math.abs(entry.amount), 0);

  const { federalRate, stateRate, includeFica, selfEmployed } = taxSettings;
  const ficaRate = includeFica ? (selfEmployed ? 0.153 : 0.0765) : 0;
  const federalWithheld = taxablePay * (federalRate / 100);
  const stateWithheld = taxablePay * (stateRate / 100);
  const ficaWithheld = taxablePay * ficaRate;
  const totalTaxes = federalWithheld + stateWithheld + ficaWithheld;

  const gross = taxablePay + stipendTotal + bonusTotal;
  const net = gross - expenses - totalTaxes;

  return (
    <div className="space-y-4 text-sm text-brand-ocean/80">
      <dl className="space-y-2">
        {ledger.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between rounded-3xl bg-surface-100 px-4 py-3"
          >
            <dt className="font-medium text-brand-ocean">{entry.label}</dt>
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
      <div className="rounded-3xl bg-brand-ocean px-4 py-5 text-white">
        <p className="text-xs uppercase tracking-wide text-white/70">
          Weekly take-home (after sliders)
        </p>
        <p className="mt-1 text-2xl font-bold">{formatCurrency(net)}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
          <div>
            <p className="text-white/70">Taxed pay</p>
            <p className="text-white">{formatCurrency(taxablePay)}</p>
          </div>
          <div>
            <p className="text-white/70">Stipends</p>
            <p className="text-white">{formatCurrency(stipendTotal)}</p>
          </div>
          <div>
            <p className="text-white/70">Bonuses</p>
            <p className="text-white">{formatCurrency(bonusTotal)}</p>
          </div>
          <div>
            <p className="text-white/70">Expenses</p>
            <p className="text-white">{formatCurrency(expenses)}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-3 rounded-2xl bg-white/10 p-3 text-xs">
          <div>
            <p className="text-white/70">Federal</p>
            <p className="font-semibold">{formatCurrency(federalWithheld)}</p>
          </div>
          <div>
            <p className="text-white/70">State</p>
            <p className="font-semibold">{formatCurrency(stateWithheld)}</p>
          </div>
          <div>
            <p className="text-white/70">FICA</p>
            <p className="font-semibold">{formatCurrency(ficaWithheld)}</p>
          </div>
        </div>
        <p className="mt-3 text-[11px] uppercase tracking-wide text-white/60">
          Estimated taxes: {formatCurrency(totalTaxes)}
        </p>
      </div>
    </div>
  );
}
