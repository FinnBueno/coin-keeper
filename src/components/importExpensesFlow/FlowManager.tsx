import { Typography } from "@mui/material";
import { useState, type FC } from "react";
import type { FlowStepComponent } from "./views/FlowStepType";
import { StartNewPeriodContextProvider } from "../../context/StartNewPeriodContext";
import { InputDataStep } from "./views/InputDataStep";
import { RefineStep } from "./views/RefineStep";
import { InputBankDataContextProvider } from "../../context/InputBankDataContext";

type State = "input_data" | "refine";

const componentsByState: Record<State, FlowStepComponent> = {
  input_data: InputDataStep,
  refine: RefineStep,
};

const titlesByState: Record<State, string> = {
  input_data: "Input bank statements",
  refine: "Refine entries",
};

const ALL_STATES = Object.keys(componentsByState) as State[];

export const FlowManager: FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [state, setState] = useState<State>("input_data");

  const handleFinishFlow = () => {
    setState("input_data");
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
    <InputBankDataContextProvider>
      <Typography mb={2} variant="h6" component="h2">
        {titlesByState[state]}
      </Typography>
      <ComponentStep goNext={handleNext} goBack={handleBack} />
    </InputBankDataContextProvider>
  );
};
