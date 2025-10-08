"use client";

import { create } from "zustand";
import type {
  Certification,
  CredentialTask,
  FinanceGoal,
  LevelState,
  LedgerEntry,
  LicenseProgress,
  Message,
  Offer,
  PlayerState,
  Quest,
  ReputationState,
  Shift,
  TaxSettings,
} from "@/lib/types";
import { offers as seedOffers } from "@/data/offers";

export type HousingTier = "Frugal" | "Standard" | "Premium";

type LevelDefinition = {
  level: number;
  xp: number;
  title: string;
  unlock: string;
};

const LEVEL_DEFINITIONS: LevelDefinition[] = [
  { level: 1, xp: 0, title: "Rookie", unlock: "Tutorial; AMP partner unlocked." },
  { level: 2, xp: 150, title: "Settled", unlock: "Housing shortlist + budget goals." },
  { level: 3, xp: 350, title: "Ready", unlock: "Add one certification track." },
  { level: 4, xp: 600, title: "Explorer", unlock: "Map view + city stamps." },
  { level: 5, xp: 900, title: "Specialist", unlock: "Second unit familiarity." },
  { level: 6, xp: 1250, title: "Networked", unlock: "Agency rep perks I (+faster offers)." },
  { level: 7, xp: 1650, title: "Compact Pro", unlock: "NLC fast-track discount." },
  { level: 8, xp: 2100, title: "Veteran", unlock: "Reduced fatigue from nights." },
  { level: 9, xp: 2600, title: "Planner", unlock: "Two queued licenses." },
  { level: 10, xp: 3150, title: "Mentor", unlock: "Referral bonuses + cosmetic packs." },
];

const deriveLevelState = (xp: number): LevelState => {
  const current = LEVEL_DEFINITIONS.reduce((acc, level) =>
    xp >= level.xp ? level : acc,
  LEVEL_DEFINITIONS[0]);
  const currentIndex = LEVEL_DEFINITIONS.findIndex(
    (level) => level.level === current.level,
  );
  const next = LEVEL_DEFINITIONS[currentIndex + 1];
  const xpIntoLevel = xp - current.xp;
  const xpToNext = next ? next.xp - current.xp : null;
  return {
    level: current.level,
    title: current.title,
    unlock: current.unlock,
    xpIntoLevel,
    xpToNext,
    nextLevel: next?.level,
    nextUnlock: next?.unlock,
  };
};

const initialPlayer: PlayerState = {
  name: "Jada",
  specialty: "ICU",
  homeState: "TX",
  nlc: true,
  energy: 75,
  morale: 82,
  savings: 12850,
  avatar: {
    scrubsColor: "#00AAA1",
    skinTone: "#F2D3C3",
    hairColor: "#2F1B10",
    accessory: "stethoscope",
  },
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
  { id: "pay-1", type: "pay", label: "Base pay (36h)", amount: 2052, taxable: true },
  { id: "pay-2", type: "pay", label: "Housing stipend", amount: 1100, taxable: false },
  { id: "pay-3", type: "pay", label: "Meals & incidentals", amount: 330, taxable: false },
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
    subject: "Level 2 unlocked!",
    body: "Budget goals are live in Finances. Keep energy above 60% to nail today's quest—I'm here if you need backup housing options.",
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

const initialDailyQuests: Quest[] = [
  {
    id: "quest-doc",
    name: "Complete 1 doc",
    description: "Move any credential into Approved to earn XP.",
    type: "daily",
    progress: 0,
    target: 1,
    xpReward: 15,
    completed: false,
  },
  {
    id: "quest-energy",
    name: "Balance energy above 60%",
    description: "Rest or toggle auto self-care to stay fresh for tonight's shift.",
    type: "daily",
    progress: 1,
    target: 1,
    xpReward: 10,
    completed: true,
  },
  {
    id: "quest-compare",
    name: "Compare 2 offers",
    description: "Review at least two agency packages before choosing.",
    type: "daily",
    progress: 1,
    target: 2,
    xpReward: 15,
    completed: false,
  },
];

const initialReputation: ReputationState = {
  agencies: [
    { id: "amp", name: "AMP", score: 88, trend: "up" },
    { id: "pulse", name: "Pulse Staffers", score: 74, trend: "steady" },
  ],
  facilities: [
    { id: "tulane", name: "Tulane Lakeside", score: 82, trend: "up" },
    { id: "rocky", name: "Rocky Mountain Womens", score: 69, trend: "steady" },
  ],
};

const initialTaxSettings: TaxSettings = {
  federalRate: 22,
  stateRate: 5,
  includeFica: true,
  selfEmployed: false,
};

const initialXp = 240;

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
  xp: number;
  levelState: LevelState;
  dailyQuests: Quest[];
  reputation: ReputationState;
  taxSettings: TaxSettings;
  selectOffer: (offerId: string) => void;
  advanceTask: (taskId: string) => void;
  toggleSelfCare: () => void;
  chooseHousing: (tier: HousingTier) => void;
  restoreEnergy: (amount: number) => void;
  completeQuest: (questId: string) => void;
  updateQuestProgress: (questId: string, progress: number) => void;
  gainXp: (amount: number) => void;
  setFederalRate: (rate: number) => void;
  setStateRate: (rate: number) => void;
  toggleFica: () => void;
  toggleSelfEmployed: () => void;
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
  xp: initialXp,
  levelState: deriveLevelState(initialXp),
  dailyQuests: initialDailyQuests,
  reputation: initialReputation,
  taxSettings: initialTaxSettings,
  selectOffer: (offerId) => set({ selectedOfferId: offerId }),
  advanceTask: (taskId) =>
    set((state) => {
      let gainedXp = 0;
      let questIncrement: string | null = null;
      const tasks = state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        if (task.status === "to-collect") {
          return {
            ...task,
            status: "in-review",
            etaHours: Math.max(4, task.etaHours - 8),
          };
        }
        if (task.status === "in-review") {
          gainedXp += 15;
          if (task.type === "credential") {
            questIncrement = "quest-doc";
          }
          return { ...task, status: "approved", etaHours: 0 };
        }
        return task;
      });
      const updates: Partial<NurseStore> = { tasks };
      if (questIncrement) {
        updates.dailyQuests = state.dailyQuests.map((quest) =>
          quest.id === questIncrement
            ? {
                ...quest,
                progress: Math.min(quest.progress + 1, quest.target),
              }
            : quest,
        );
      }
      if (gainedXp > 0) {
        const xp = state.xp + gainedXp;
        updates.xp = xp;
        updates.levelState = deriveLevelState(xp);
      }
      return updates;
    }),
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
  gainXp: (amount) =>
    set((state) => {
      const xp = state.xp + amount;
      return { xp, levelState: deriveLevelState(xp) };
    }),
  completeQuest: (questId) =>
    set((state) => {
      const quest = state.dailyQuests.find((q) => q.id === questId);
      if (!quest || quest.completed) {
        return { dailyQuests: state.dailyQuests };
      }
      const dailyQuests = state.dailyQuests.map((q) =>
        q.id === questId
          ? { ...q, completed: true, progress: q.target }
          : q,
      );
      const xp = state.xp + quest.xpReward;
      return {
        dailyQuests,
        xp,
        levelState: deriveLevelState(xp),
      };
    }),
  updateQuestProgress: (questId, progress) =>
    set((state) => ({
      dailyQuests: state.dailyQuests.map((quest) =>
        quest.id === questId
          ? {
              ...quest,
              progress: Math.min(progress, quest.target),
              completed: quest.completed,
            }
          : quest,
      ),
    })),
  setFederalRate: (rate) =>
    set((state) => ({
      taxSettings: { ...state.taxSettings, federalRate: rate },
    })),
  setStateRate: (rate) =>
    set((state) => ({
      taxSettings: { ...state.taxSettings, stateRate: rate },
    })),
  toggleFica: () =>
    set((state) => ({
      taxSettings: {
        ...state.taxSettings,
        includeFica: !state.taxSettings.includeFica,
      },
    })),
  toggleSelfEmployed: () =>
    set((state) => ({
      taxSettings: {
        ...state.taxSettings,
        selfEmployed: !state.taxSettings.selfEmployed,
      },
    })),
}));
