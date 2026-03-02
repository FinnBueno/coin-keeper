import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type FC,
  type ReactNode,
} from "react";
import type { MonthPlanning } from "../repositories/periodManagement/IPeriodManagementRepository";
import { PeriodManagementService } from "../services/PeriodManagementService";
import { FirebasePeriodManagementRepository } from "../repositories/periodManagement/PeriodManagementRepository";
import type { MonthlyPeriod } from "../repositories/periodManagement/IPeriodManagementRepository";
import { GlobalLoadingScreen } from "../components/general/GlobalLoadingScreen";
import type { BankExport } from "../services/banking";

interface DataClient {
  startNewPeriod: (
    startAmount: number,
    toSharedAccount: number,
    toPersonalAccount: number,
    personalSpending: number,
    planning: MonthPlanning,
  ) => void;
  registerBankEntries: (data: BankExport) => void;
  currentPeriod?: MonthlyPeriod;
  lastRunResult?: BankExport["scannedUpTo"];
  currentBalance: number;
  finalBalance: number;
  hasSharedSaveBeenMade: boolean;
  savedToShared: number;
  hasPersonalSaveBeenMade: boolean;
  savedToPersonal: number;
}

const DataClientContext = createContext<DataClient>({
  startNewPeriod: () => {},
  registerBankEntries: () => {},
  currentPeriod: undefined,
  lastRunResult: undefined,
  currentBalance: 0,
  finalBalance: 0,
  hasSharedSaveBeenMade: false,
  savedToShared: 0,
  hasPersonalSaveBeenMade: false,
  savedToPersonal: 0,
});

export const periodManagementService = new PeriodManagementService(
  new FirebasePeriodManagementRepository(),
);

const getCurrentPeriodSnapshot = periodManagementService.getCurrentPeriod.bind(
  periodManagementService,
);

const subscribeToCurrentPeriod =
  periodManagementService.subscribeToCurrentPeriod.bind(
    periodManagementService,
  );

const getLastRunResultSnapshot = periodManagementService.getLastRunResult.bind(
  periodManagementService,
);

const subscribeToLastRunResult =
  periodManagementService.subscribeToLastRunResult.bind(
    periodManagementService,
  );

export const DataClientProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const startNewPeriod = useMemo(
    () =>
      (
        startAmount: number,
        toSharedAccount: number,
        toPersonalAccount: number,
        personalSpending: number,
        planning: MonthPlanning,
      ) => {
        periodManagementService.startNewPeriod(
          startAmount,
          toSharedAccount,
          toPersonalAccount,
          personalSpending,
          planning,
        );
      },
    [],
  );

  const currentPeriod = useSyncExternalStore<MonthlyPeriod | undefined>(
    subscribeToCurrentPeriod,
    getCurrentPeriodSnapshot,
  );

  const registerBankEntries = useMemo(
    () => (data: BankExport) =>
      periodManagementService.registerBankEntries(data),
    [],
  );

  const lastRunResult = useSyncExternalStore<
    BankExport["scannedUpTo"] | undefined
  >(subscribeToLastRunResult, getLastRunResultSnapshot);

  const currentBalance = useMemo(() => {
    if (currentPeriod) {
      const { startAmount, bankEntries } = currentPeriod;
      const sumOfEntries =
        bankEntries.reduce((total, cur) => total + cur.amount, 0) * -1;
      return startAmount - sumOfEntries;
    }
    return Number.MIN_SAFE_INTEGER;
  }, [currentPeriod]);

  const finalBalance = useMemo(() => {
    if (currentPeriod) {
      const {
        bankEntries,
        planning,
        startAmount,
        toPersonalAccount,
        toSharedAccount,
      } = currentPeriod;

      if (!planning || !startAmount) return Number.MIN_SAFE_INTEGER;

      const moneySpentOnFoodSoFar =
        bankEntries
          .filter((be) => be.category === "food")
          .reduce((t, c) => t + c.amount, 0) * -1;

      const moneySpentOnTravelSoFar =
        bankEntries
          .filter((be) => be.category === "travel")
          .reduce((t, c) => t + c.amount, 0) * -1;

      const foodBudget = Math.max(planning.foodBudget, moneySpentOnFoodSoFar);
      const travelBudget = Math.max(
        planning.travelBudget,
        moneySpentOnTravelSoFar,
      );

      const unscheduledSpending =
        bankEntries
          .filter((be) => !be.plannedExpenseId)
          .filter(
            (be) =>
              be.title !== "Sparen" && be.title !== "C.E.S Kroon en/of F. Bon",
          )
          .reduce((t, c) => t + c.amount, 0) * -1;

      // for this, we sum up the expected values of all scheduled expenses
      // except if the sum of bank entries for a given scheduled expense
      // exceed the expected value for that expense, then we use that value
      const scheduledSpending =
        planning.scheduledExpenses
          .map((se) => {
            const amountSpent = bankEntries
              .filter((be) => be.plannedExpenseId === se.id)
              .reduce((t, c) => t + c.amount, 0);
            const total = se.amount;
            return Math.max(total, amountSpent);
          })
          .reduce((t, c) => t + c, 0) * -1;

      let sharedSaving = currentPeriod.bankEntries
        .filter((be) => be.title === "C.E.S Kroon en/of F. Bon")
        .reduce((t, c) => t - c.amount, 0);
      if (!sharedSaving) sharedSaving = toSharedAccount;

      let personalSaving = currentPeriod.bankEntries
        .filter((be) => be.title === "Sparen")
        .reduce((t, c) => t - c.amount, 0);
      if (!personalSaving) personalSaving = toPersonalAccount;

      return (
        startAmount -
        sharedSaving -
        personalSaving -
        foodBudget -
        travelBudget -
        unscheduledSpending -
        scheduledSpending
      );
    }
    return Number.MAX_SAFE_INTEGER;
  }, [currentPeriod]);

  const hasSharedSaveBeenMade = useMemo(
    () =>
      !!currentPeriod?.bankEntries.find(
        // todo: make the title of my joint savings account configurable
        (be) => be.title === "C.E.S Kroon en/of F. Bon",
      ),
    [currentPeriod],
  );
  const savedToShared =
    useMemo(() => {
      return (
        currentPeriod?.bankEntries.reduce((total, current) => {
          if (current.title === "C.E.S Kroon en/of F. Bon") {
            return total + current.amount;
          }
          return total;
        }, 0) ?? 0
      );
    }, [currentPeriod]) * -1;

  const hasPersonalSaveBeenMade = useMemo(
    () =>
      !!currentPeriod?.bankEntries.find(
        (be) =>
          // todo: make the title of my personal savings account configurable
          be.title === "Sparen",
      ),
    [currentPeriod],
  );
  const savedToPersonal =
    useMemo(() => {
      return (
        currentPeriod?.bankEntries.reduce((total, current) => {
          if (current.title === "Sparen") {
            return total + current.amount;
          }
          return total;
        }, 0) ?? 0
      );
    }, [currentPeriod]) * -1;

  if (!currentPeriod) return <GlobalLoadingScreen />;

  return (
    <DataClientContext.Provider
      value={{
        startNewPeriod,
        currentPeriod,
        registerBankEntries,
        lastRunResult,
        currentBalance,
        finalBalance,
        hasSharedSaveBeenMade,
        savedToShared,
        hasPersonalSaveBeenMade,
        savedToPersonal,
      }}
    >
      {children}
    </DataClientContext.Provider>
  );
};

export const useDataClient = () => useContext(DataClientContext);
