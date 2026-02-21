import { Button, Typography } from "@mui/material";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";

export const ConfirmationStep: FlowStepComponent = ({ goNext, goBack }) => {
  const { startAmount, planning } = useStartNewPeriod();

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>Please review what you've filled in below.</Typography>
      
      {JSON.stringify(startAmount)}
      {JSON.stringify(planning)}
      <Button color="info" variant="contained" fullWidth onClick={goNext}>
        Start new period
      </Button>
      <Button onClick={goBack} color="info" variant="text">
        Go back
      </Button>
    </Flex>
  );
};
