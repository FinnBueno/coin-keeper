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
}

const DataClientContext = createContext<DataClient>({
  startNewPeriod: () => {},
  registerBankEntries: () => {},
  currentPeriod: undefined,
  lastRunResult: undefined,
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

  if (!currentPeriod) return <GlobalLoadingScreen />;

  return (
    <DataClientContext.Provider
      value={{
        startNewPeriod,
        currentPeriod,
        registerBankEntries,
        lastRunResult,
      }}
    >
      {children}
    </DataClientContext.Provider>
  );
};

export const useDataClient = () => useContext(DataClientContext);
