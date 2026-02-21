import { Box, Button, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";

export const ShowTransfersStep: FlowStepComponent = ({ goNext, goBack }) => {
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>
        Please transfer these amounts to the following accounts:
      </Typography>
      <Box display="grid" gridTemplateColumns="1fr fit-content(100%)">
        <Typography>🖤 To the shared account:</Typography>
        <Typography>€ 100,00</Typography>
        <Typography>💶 To your personal account:</Typography>
        <Typography>€ 100,00</Typography>
      </Box>
      <Typography>
        You'll have <span style={{ fontWeight: "bold" }}>€ 100,-</span> to spend
        this month.
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
