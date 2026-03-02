import type { FC } from "react";
import { Flex } from "../general/Flex";
import { Typography } from "@mui/material";
import { useDataClient } from "../../context/DatabaseContext";
import { parseNumericDate, parseTimestamp } from "../../util/easyDates";

export const CurrentPeriodInfo: FC = () => {
  const { lastRunResult, currentPeriod } = useDataClient();
  if (!lastRunResult || !currentPeriod) return null;
  return (
    <Flex flexDirection="column" alignItems="flex-end">
      <Typography variant="body1" fontWeight="bold">
        Period started on
      </Typography>
      <Typography variant="h6">
        {parseTimestamp(currentPeriod!.startTime)}
      </Typography>
      <Typography variant="body1" fontWeight="bold">
        Most recent import
      </Typography>
      <Typography variant="h6">
        {parseNumericDate(lastRunResult!.dateLabel)}
      </Typography>
      {lastRunResult?.wasTrimmedBySalaryEntry && (
        <Typography>Salary detected, start new period soon.</Typography>
      )}
    </Flex>
  );
};
