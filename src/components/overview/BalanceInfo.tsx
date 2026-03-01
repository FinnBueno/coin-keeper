import { Box, Link, Typography } from "@mui/material";
import type { FC } from "react";
import { useDataClient } from "../../context/DatabaseContext";
import { toEuro } from "../../util/money";
import { Flex } from "../general/Flex";

export const BalanceInfo: FC = () => {
  const { currentPeriod } = useDataClient();
  let finalBalance = 0;
  if (currentPeriod) {
    finalBalance =
      currentPeriod.personalSpending -
      currentPeriod.planning.foodBudget -
      currentPeriod.planning.travelBudget -
      currentPeriod.planning.scheduledExpenses.reduce(
        (total, current) => total + current.amount,
        0,
      );
  }
  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column">
      <Typography variant="h5" mb={2}>
        You're currently on{" "}
        <span style={{ fontWeight: "bold" }}>January's</span> salary.
      </Typography>
      <Flex gap={16}>
        <Flex flexDirection="column">
          <Typography variant="h5">Current balance</Typography>
          <Typography variant="h2" fontWeight="bold">
            {toEuro(currentPeriod?.personalSpending ?? 0)}
          </Typography>
        </Flex>
        <Flex flexDirection="column">
          <Typography variant="h5">You'll end with...</Typography>
          <Typography variant="h2" fontWeight="bold">
            {toEuro(finalBalance)}
          </Typography>
        </Flex>
      </Flex>
    </Box>
  );
};
