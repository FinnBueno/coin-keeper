import { z } from "zod";
import { months, monthMaxDays, type Months } from "../../util/months";
import { typedObjectKeys } from "../../util/types";
import type {
  BankExportLastRun,
  BankExportStatement,
} from "../../services/banking";

export interface MonthlyPeriod {
  id: string;
  startAmount: number;
  toSharedAccount: number;
  toPersonalAccount: number;
  personalSpending: number;
  planning: MonthPlanning;
  startTime: number;
  endTimestamp?: number;
}

export interface IPeriodManagementRepository {
  subscribeToPeriod(
    id: string,
    callback: (currentPeriod: MonthlyPeriod) => void,
  ): () => void;
  subscribeToLastRunResult(
    callback: (lastRunResult: BankExportLastRun) => void,
  ): () => void;
  getPeriodById(currentPeriodId: string): Promise<MonthlyPeriod>;
  upsertPeriodById(id: string, period: MonthlyPeriod): Promise<void>;
  setClosedManually(
    periodId: string,
    expectedExpenseId: string,
    value: boolean,
  ): Promise<void>;
  setLastRunResult(data: BankExportLastRun): Promise<void>;
  insertBankEntries(
    periodId: string,
    entries: BankExportStatement[],
  ): Promise<void>;
}

export interface MonthPlanning {
  travelBudget: number;
  foodBudget: number;
  scheduledExpenses: ScheduledExpense[];
  spontaneousExpenses: SpontaneousExpenses[];
}

export const planCategories = {
  food: "Food & Groceries",
  life: "Life",
  wantToHave: "Want to have",
  events: "Events",
  travel: "Travel",
};

export type PlanCategories = typeof planCategories;

export type PlanCategory = keyof PlanCategories;

export const mapPlanCategories = <T>(
  fn: (id: keyof PlanCategories, value: string) => T,
) =>
  Object.entries(planCategories).map(([key, value]) =>
    fn(key as keyof PlanCategories, value),
  );

export const planTypes = {
  exact: "Exactly",
  upTo: "Up to",
};

export type PlanTypes = typeof planTypes;

export type PlanType = keyof PlanTypes;

export const mapPlanTypes = <T>(
  fn: (id: keyof PlanTypes, value: string) => T,
) =>
  Object.entries(planTypes).map(([key, value]) =>
    fn(key as keyof PlanTypes, value),
  );

const dateSchema = z
  .object({
    dayofmonth: z.coerce.number().gte(1).lte(31),
    month: z.enum(months),
  })
  .refine(
    ({ dayofmonth, month }) =>
      month && monthMaxDays[month] ? dayofmonth <= monthMaxDays[month]() : true,
    {
      message: "Day exceeds the number of days in the month",
      path: ["dayofmonth"],
    },
  );

export type DateAt = z.infer<typeof dateSchema>;

const expenseEntrySchema = z.object({
  amount: z.coerce.number().gt(0),
  at: dateSchema,
});

const planSchema = z.object({
  title: z.string("Required"),
  type: z.enum(typedObjectKeys(planTypes)),
  category: z.enum(typedObjectKeys(planCategories)),
  amount: z.coerce.number().gt(0),
  at: dateSchema,
  expenseEntries: z.array(expenseEntrySchema).default([]),
  isClosedManually: z.boolean().optional(),
});

export type ScheduledExpense = z.infer<typeof planSchema> & {
  id: string;
};

export interface SpontaneousExpenses {
  title: string;
  category: PlanCategories;
  amount: number;
  at: {
    dayofmonth: number;
    month: Months;
  };
}
