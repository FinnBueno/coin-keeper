import type { FC } from "react";
import { Flex } from "../general/Flex";
import { Typography } from "@mui/material";

export const CurrentPeriodInfo: FC = () => {
  return (
    <Flex flexDirection="column" alignItems="flex-end">
      <Typography variant="body1" fontWeight="bold">
        Period started on
      </Typography>
      <Typography variant="h6">26/01/2026</Typography>
      <Typography variant="body1" fontWeight="bold">
        Last run
      </Typography>
      <Typography variant="h6">20/02/2026</Typography>
    </Flex>
  );
};
