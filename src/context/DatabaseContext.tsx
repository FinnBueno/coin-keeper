import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useSyncExternalStore,
  type FC,
  type ReactNode,
} from "react";
import type { MonthPlanning } from "../repositories/periodManagement/IPeriodManagementRepository";
import { PeriodManagementService } from "../services/PeriodManagementService";
import { FirebasePeriodManagementRepository } from "../repositories/periodManagement/PeriodManagementRepository";
import type { MonthlyPeriod } from "../repositories/periodManagement/IPeriodManagementRepository";
import { PersonalVideoSharp } from "@mui/icons-material";
import { GlobalLoadingScreen } from "../components/general/GlobalLoadingScreen";

interface DataClient {
  startNewPeriod: (
    startAmount: number,
    toSharedAccount: number,
    toPersonalAccount: number,
    personalSpending: number,
    planning: MonthPlanning,
  ) => void;
  currentPeriod: MonthlyPeriod | undefined;
}

const DataClientContext = createContext<DataClient>({
  startNewPeriod: () => {},
  currentPeriod: undefined,
});

export const periodManagementService = new PeriodManagementService(
  new FirebasePeriodManagementRepository(),
);

const getSnapshot = periodManagementService.getCurrentPeriod.bind(
  periodManagementService,
);

// let pendingPromise: Promise<void> | undefined;
// let releaseLoadingState: (() => void) | undefined = undefined;

const subscribe = periodManagementService.subscribeToCurrentPeriod.bind(
  periodManagementService,
);
/*
(newPeriod) => {
  console.log("new period received", newPeriod);
  if (newPeriod) {
    if (releaseLoadingState) releaseLoadingState();
    pendingPromise = undefined;
    releaseLoadingState = undefined;
  }
*/

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
    subscribe,
    getSnapshot,
  );

  if (!currentPeriod) return <GlobalLoadingScreen />;

  return (
    <DataClientContext.Provider
      value={{
        startNewPeriod,
        currentPeriod,
      }}
    >
      {children}
    </DataClientContext.Provider>
  );
};

export const useDataClient = () => useContext(DataClientContext);
