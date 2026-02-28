import { Box, Button, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { useSavingCalculations } from "../../../hooks/useSavingCalculations";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";
import { toEuro } from "../../../util/money";

export const ShowTransfersStep: FlowStepComponent = ({ goNext, goBack }) => {
  const { startAmount } = useStartNewPeriod();
  const { toSharedAccount, toPersonalAccount, personalSpending } =
    useSavingCalculations(startAmount);
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>
        Please transfer these amounts to the following accounts:
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr fit-content(100%)">
        <Typography>🖤 To the shared account:</Typography>
        <Typography>{toEuro(toSharedAccount)}</Typography>
        <Typography>💶 To your personal account:</Typography>
        <Typography>{toEuro(toPersonalAccount)}</Typography>
      </Box>
      <Typography>
        You'll have{" "}
        <span style={{ fontWeight: "bold" }}>{toEuro(personalSpending)}</span>{" "}
        to spend this month.
      </Typography>
      <Typography>Once that's done, continue to the next step.</Typography>
      <Button onClick={goNext} color="info" variant="contained">
        I've transfered everything
      </Button>
      <Button onClick={goBack} color="info" variant="text">
        Go back
      </Button>
    </Flex>
  );
};
