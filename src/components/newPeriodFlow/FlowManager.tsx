import { Typography } from "@mui/material";
import { useState, type FC } from "react";
import { BeforeStartingStep } from "./views/BeforeStarting";
import type { FlowStepComponent } from "./views/FlowStepType";
import { EnterSalaryStep } from "./views/EnterSalary";
import {
  StartNewPeriodContextProvider,
  useStartNewPeriod,
} from "../../context/StartNewPeriodContext";
import { ShowTransfersStep } from "./views/ShowTransfers";
import { PlanningStep } from "./views/Planning";
import { ConfirmationStep } from "./views/Confirmation";
import { useSavingCalculations } from "../../hooks/useSavingCalculations";
import { useDataClient } from "../../context/DatabaseContext";

type State =
  | "before_starting"
  | "enter_salary"
  | "show_transfers"
  | "enter_expected_costs"
  | "confirm";

const componentsByState: Record<State, FlowStepComponent> = {
  before_starting: BeforeStartingStep,
  enter_salary: EnterSalaryStep,
  show_transfers: ShowTransfersStep,
  enter_expected_costs: PlanningStep,
  confirm: ConfirmationStep,
};

const titlesByState: Record<State, string> = {
  before_starting: "Are you sure?",
  enter_salary: "Enter salary",
  show_transfers: "Transfer this",
  enter_expected_costs: "Any plans?",
  confirm: "Confirmation",
};

const ALL_STATES = Object.keys(componentsByState) as State[];

export const FlowManager: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [state, setState] = useState<State>("before_starting");

  const handleFinishFlow = () => {
    setState("before_starting");
    onComplete();
  };

  const index = ALL_STATES.indexOf(state);
  const max = ALL_STATES.length - 1;
  const handleNext =
    index < max ? () => setState(ALL_STATES.at(index + 1)!) : handleFinishFlow;
  const handleBack =
    index > 0 ? () => setState(ALL_STATES.at(index - 1)!) : () => {};

  const ComponentStep = componentsByState[state];
  return (
    <StartNewPeriodContextProvider>
      <Typography mb={2} variant="h6" component="h2">
        {titlesByState[state]}
      </Typography>
      <ComponentStep goNext={handleNext} goBack={handleBack} />
    </StartNewPeriodContextProvider>
  );
};
