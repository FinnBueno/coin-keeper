import { Button, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";

export const BeforeStartingStep: FlowStepComponent = ({ goNext }) => {
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>
        Are you sure you want to start a new period? You can't make changes to
        the current one once you do!
      </Typography>
      <Typography>
        Please make sure you've imported everything for last month.
      </Typography>
      <Button onClick={goNext} color="info" variant="contained">
        I've imported everything
      </Button>
    </Flex>
  );
};
