export type Agency = {
  id: string;
  name: string;
  reputation: number;
  featured?: boolean;
};

export type Offer = {
  id: string;
  facility: string;
  city: string;
  state: string;
  unit: string;
  shift: "Days" | "Nights";
  weeks: number;
  baseRate: number;
  stipendHousing: number;
  stipendMIE: number;
  housingDifficulty: number;
  ehr: "Epic" | "Cerner" | "Meditech";
  agencies: Agency[];
  blockers: string[];
  matchScore: number;
};

export type TaskStatus = "to-collect" | "in-review" | "approved";

export type CredentialTask = {
  id: string;
  name: string;
  type: "credential" | "license" | "housing";
  status: TaskStatus;
  etaHours: number;
};

export type Shift = {
  id: string;
  day: string;
  start: string;
  unit: string;
};

export type FinanceGoal = {
  id: string;
  name: string;
  saved: number;
  target: number;
};

export type LedgerEntry = {
  id: string;
  type: "pay" | "expense" | "bonus";
  label: string;
  amount: number;
  taxable?: boolean;
};

export type Message = {
  id: string;
  sender: string;
  subject: string;
  body: string;
  time: string;
};

export type LicenseProgress = {
  state: string;
  status: "Ready" | "In Progress" | "Queued";
  etaDays?: number;
};

export type Certification = {
  id: string;
  name: string;
  status: "Active" | "Expiring" | "Queued";
  etaDays?: number;
};

export type AvatarConfig = {
  scrubsColor: string;
  skinTone: string;
  hairColor: string;
  accessory?: "stethoscope" | "badge" | null;
};

export type PlayerState = {
  name: string;
  specialty: string;
  homeState: string;
  nlc: boolean;
  energy: number;
  morale: number;
  savings: number;
  avatar: AvatarConfig;
};

export type Quest = {
  id: string;
  name: string;
  description?: string;
  type: "daily" | "weekly";
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
};

export type ReputationTrack = {
  id: string;
  name: string;
  score: number;
  trend: "up" | "steady" | "down";
};

export type ReputationState = {
  agencies: ReputationTrack[];
  facilities: ReputationTrack[];
};

export type TaxSettings = {
  federalRate: number;
  stateRate: number;
  includeFica: boolean;
  selfEmployed: boolean;
};

export type LevelState = {
  level: number;
  title: string;
  unlock: string;
  xpIntoLevel: number;
  xpToNext: number | null;
  nextLevel?: number;
  nextUnlock?: string;
};
