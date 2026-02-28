import type { FC } from "react";
import type {
  ScheduledExpense,
  SpontaneousExpenses,
} from "../../repositories/periodManagement/IPeriodManagementRepository";
import { Flex } from "../general/Flex";
import { Divider, Typography } from "@mui/material";
import { ProgressBar } from "../general/ProgressBar";
import { ScheduleExpenseItem } from "./entries/scheduled/ScheduledExpenseItem";

interface Props {
  title: string;
  scheduledExpenses: Record<string, ScheduledExpense>;
  spontaneousExpenses: Record<string, SpontaneousExpenses>;
  styles: {
    main: string;
    background: string;
    icon: string;
  };
  maxSpending?: number;
}

export const CategoryList: FC<Props> = ({
  title,
  scheduledExpenses,
  styles,
  maxSpending,
}) => {
  const { main: mainColor, background: bgColor, icon } = styles;
  const listOfScheduledExpenses = Object.values(scheduledExpenses);
  const totalSpent = listOfScheduledExpenses.reduce(
    (total, current) => total + current.amount,
    0,
  );
  return (
    <Flex
      minWidth="300px"
      borderRadius={4}
      p={1}
      border={`solid 2px ${mainColor}`}
      bgcolor={bgColor}
      flexDirection="column"
    >
      <Typography variant="h5" fontWeight="bold" mb={1}>
        {icon} {title}
      </Typography>
      {maxSpending ? (
        <ProgressBar value={totalSpent} max={maxSpending} color={mainColor} />
      ) : null}
      <Divider />
      {listOfScheduledExpenses.length > 0 ? (
        <>
          <Typography variant="h6" fontWeight="bold">
            Planned expenses
          </Typography>
          <Flex
            flexDirection="column"
            gap={1}
            sx={{
              overflowY: "scroll",
            }}
          >
            {Object.entries(scheduledExpenses).map(([key, item]) => (
              <ScheduleExpenseItem id={key} content={item} color={mainColor} />
            ))}
          </Flex>
        </>
      ) : (
        <Typography variant="subtitle1">Nothing planned.</Typography>
      )}
      <Divider />
      <Typography variant="h6" fontWeight="bold">
        Spontaneous spending
      </Typography>
      {/* <SpontaneousSpendingSection items={} /> */}
    </Flex>
  );
};
