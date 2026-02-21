import { type FC } from "react";
import { Flex } from "../general/Flex";
import { Button } from "@mui/material";
import { NewPeriodFlow } from "../newPeriodFlow";

export const ImportButtons: FC = () => {
  return (
    <Flex gap={2} mt={2}>
      <Button variant="contained" size="large">
        Import bank entries
      </Button>
      <NewPeriodFlow />
    </Flex>
  );
};
