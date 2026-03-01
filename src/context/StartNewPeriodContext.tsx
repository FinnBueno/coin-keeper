import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { MonthPlanning } from "../repositories/periodManagement/IPeriodManagementRepository";

interface StartNewPeriodControls {
  setStartAmount: Dispatch<SetStateAction<number>>;
  startAmount: number;
  setPlanning: Dispatch<SetStateAction<MonthPlanning>>;
  planning?: MonthPlanning;
}

const StartNewPeriodContext = createContext<StartNewPeriodControls>({
  setStartAmount: () => {},
  startAmount: 0,
  setPlanning: () => {},
  planning: undefined,
});

export const StartNewPeriodContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [startAmount, setStartAmount] =
    useState<StartNewPeriodControls["startAmount"]>(0);
  const [planning, setPlanning] = useState<MonthPlanning>({
    foodBudget: 0,
    travelBudget: 0,
    scheduledExpenses: [],
    spontaneousExpenses: [],
  });

  return (
    <StartNewPeriodContext.Provider
      value={{
        setStartAmount,
        startAmount,
        setPlanning,
        planning,
      }}
    >
      {children}
    </StartNewPeriodContext.Provider>
  );
};

export const useStartNewPeriod = () => useContext(StartNewPeriodContext);
