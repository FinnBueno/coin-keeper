import type { FC } from "react";
import { type ScheduledExpense } from "../../../../repositories/periodManagement/IPeriodManagementRepository";
import { Flex } from "../../../general/Flex";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { toEuro } from "../../../../util/money";
import { ProgressBar } from "../../../general/ProgressBar";
import { easyDate, hasPassed } from "../../../../util/easyDates";
import { CheckCircleOutline, EditOutlined } from "@mui/icons-material";
import { periodManagementService } from "../../../../context/DatabaseContext";
import { ItemCompleteBody } from "./ItemCompleteBody";

interface Props {
  id: string;
  content: ScheduledExpense;
  color: string;
}

export const ScheduledExpenseItem: FC<Props> = ({ id, content, color }) => {
  const spent =
    content.expenseEntries?.reduce(
      (total, current) => total + current.amount,
      0,
    ) ?? 0;
  const isComplete =
    (hasPassed(content.at) && (content.expenseEntries?.length ?? 0) > 0) ||
    content.isClosedManually;

  const handleManualComplete = () =>
    periodManagementService.manuallyCloseExpectedExpense(id);
  const handleUndoManualComplete = () =>
    periodManagementService.undoManualCloseExpectedExpense(id);

  return (
    <Flex flexDirection="column" position="relative">
      {!isComplete && (
        <Box position="absolute" top={0} right={0}>
          <Tooltip title={"Manually close this item without spending"}>
            <IconButton onClick={handleManualComplete}>
              <CheckCircleOutline />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      {isComplete && content.isClosedManually && (
        <Box position="absolute" top={0} right={0}>
          <IconButton onClick={handleUndoManualComplete}>
            <EditOutlined />
          </IconButton>
        </Box>
      )}
      <Typography
        variant="h6"
        sx={{
          textDecoration: isComplete ? "line-through" : "initial",
        }}
      >
        {content.title}
      </Typography>
      {isComplete ? (
        <ItemCompleteBody spent={spent} amount={content.amount} />
      ) : (
        <>
          {content.type === "upTo" ? (
            <>
              <Typography>
                Up to {toEuro(content.amount)} until {easyDate(content.at)}
              </Typography>
              <Flex gap={1}>
                <ProgressBar max={content.amount} value={spent} color={color} />
                <Typography whiteSpace="nowrap">{toEuro(spent)}</Typography>
              </Flex>
            </>
          ) : (
            <Typography>
              {toEuro(content.amount)} on {easyDate(content.at)}
            </Typography>
          )}
        </>
      )}
    </Flex>
  );
};
