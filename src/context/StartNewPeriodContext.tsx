import {
  createContext,
  useContext,
  useState,
  type FC,
  type ReactNode,
} from "react";
import type { NewMonthPlanningComplete } from "./startPeriodTypes";

interface StartNewPeriodControls {
  setStartAmount: (startAmount: number) => void;
  startAmount: number;
  setPlanning: (newPlanning: NewMonthPlanningComplete) => void;
  planning?: NewMonthPlanningComplete;
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
  const [planning, setPlanning] =
    useState<StartNewPeriodControls["planning"]>(undefined);

  return (
    <StartNewPeriodContext.Provider
      value={{
        setStartAmount,
        startAmount,
        planning,
        setPlanning,
      }}
    >
      {children}
    </StartNewPeriodContext.Provider>
  );
};

export const useStartNewPeriod = () => useContext(StartNewPeriodContext);
