"use client";

import { create } from "zustand";
import type {
  Certification,
  CredentialTask,
  FinanceGoal,
  LedgerEntry,
  LicenseProgress,
  Message,
  Offer,
  PlayerState,
  Shift,
} from "@/lib/types";
import { offers as seedOffers } from "@/data/offers";

export type HousingTier = "Frugal" | "Standard" | "Premium";

const initialPlayer: PlayerState = {
  name: "Jada",
  specialty: "ICU",
  homeState: "TX",
  nlc: true,
  energy: 75,
  morale: 82,
  savings: 12850,
};

const initialTasks: CredentialTask[] = [
  {
    id: "task-1",
    name: "Update LA license docs",
    type: "license",
    status: "to-collect",
    etaHours: 24,
  },
  {
    id: "task-2",
    name: "Upload flu shot",
    type: "credential",
    status: "in-review",
    etaHours: 6,
  },
  {
    id: "task-3",
    name: "Confirm housing shortlist",
    type: "housing",
    status: "to-collect",
    etaHours: 8,
  },
];

const initialShifts: Shift[] = [
  { id: "shift-1", day: "Wed", start: "19:00", unit: "ICU" },
  { id: "shift-2", day: "Thu", start: "19:00", unit: "ICU" },
  { id: "shift-3", day: "Sat", start: "19:00", unit: "ICU" },
];

const initialLedger: LedgerEntry[] = [
  { id: "pay-1", type: "pay", label: "Base pay (36h)", amount: 2052 },
  { id: "pay-2", type: "pay", label: "Housing stipend", amount: 1100 },
  { id: "pay-3", type: "pay", label: "Meals & incidentals", amount: 330 },
  { id: "expense-1", type: "expense", label: "Travel + scrubs", amount: -140 },
  { id: "expense-2", type: "expense", label: "Housing overage", amount: -180 },
];

const initialGoals: FinanceGoal[] = [
  { id: "goal-1", name: "Emergency fund", saved: 5200, target: 8000 },
  { id: "goal-2", name: "Compact license fund", saved: 900, target: 1200 },
  { id: "goal-3", name: "Ski trip savings", saved: 450, target: 900 },
];

const initialMessages: Message[] = [
  {
    id: "msg-1",
    sender: "AMP • Mya",
    subject: "Congrats on submitting docs!",
    body: "LA board is moving quick today—I'll ping you as soon as the license clears.",
    time: "2h ago",
  },
  {
    id: "msg-2",
    sender: "Housing Scout",
    subject: "French Quarter loft",
    body: "Found a cozy studio with 10 min commute. Want me to reserve a virtual tour for Friday?",
    time: "5h ago",
  },
];

const initialLicenses: LicenseProgress[] = [
  { state: "TX", status: "Ready" },
  { state: "LA", status: "In Progress", etaDays: 5 },
  { state: "CA", status: "Queued", etaDays: 14 },
];

const initialCerts: Certification[] = [
  { id: "cert-1", name: "BLS", status: "Active" },
  { id: "cert-2", name: "ACLS", status: "Active" },
  { id: "cert-3", name: "NRP", status: "Queued", etaDays: 7 },
];

export type NurseStore = {
  player: PlayerState;
  offers: Offer[];
  selectedOfferId: string | null;
  tasks: CredentialTask[];
  shifts: Shift[];
  ledger: LedgerEntry[];
  goals: FinanceGoal[];
  messages: Message[];
  licenses: LicenseProgress[];
  certs: Certification[];
  housingTier: HousingTier;
  autoSelfCare: boolean;
  energyTrend: "stable" | "low" | "high";
  selectOffer: (offerId: string) => void;
  advanceTask: (taskId: string) => void;
  toggleSelfCare: () => void;
  chooseHousing: (tier: HousingTier) => void;
  restoreEnergy: (amount: number) => void;
};

export const useNurseStore = create<NurseStore>((set, get) => ({
  player: initialPlayer,
  offers: seedOffers,
  selectedOfferId: seedOffers[0]?.id ?? null,
  tasks: initialTasks,
  shifts: initialShifts,
  ledger: initialLedger,
  goals: initialGoals,
  messages: initialMessages,
  licenses: initialLicenses,
  certs: initialCerts,
  housingTier: "Standard",
  autoSelfCare: true,
  energyTrend: "stable",
  selectOffer: (offerId) => set({ selectedOfferId: offerId }),
  advanceTask: (taskId) =>
    set(({ tasks }) => ({
      tasks: tasks.map((task) => {
        if (task.id !== taskId) return task;
        if (task.status === "to-collect") {
          return {
            ...task,
            status: "in-review",
            etaHours: Math.max(4, task.etaHours - 8),
          };
        }
        if (task.status === "in-review") {
          return { ...task, status: "approved", etaHours: 0 };
        }
        return task;
      }),
    })),
  toggleSelfCare: () => set((state) => ({ autoSelfCare: !state.autoSelfCare })),
  chooseHousing: (tier) =>
    set(() => ({
      housingTier: tier,
      ledger: get().ledger.map((entry) =>
        entry.id === "expense-2"
          ? {
              ...entry,
              amount:
                tier === "Frugal" ? -40 : tier === "Premium" ? -260 : -180,
              label: `Housing overage (${tier})`,
            }
          : entry,
      ),
    })),
  restoreEnergy: (amount) =>
    set(({ player }) => {
      const energy = Math.min(100, player.energy + amount);
      const energyTrend = energy > 80 ? "high" : energy < 50 ? "low" : "stable";
      return { player: { ...player, energy }, energyTrend };
    }),
}));
