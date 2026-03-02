import type { FC } from "react";
import type { ScheduledExpense } from "../../repositories/periodManagement/IPeriodManagementRepository";
import { Flex } from "../general/Flex";
import { Divider, Typography } from "@mui/material";
import { ProgressBar } from "../general/ProgressBar";
import { ScheduledExpenseItem } from "./entries/scheduled/ScheduledExpenseItem";
import type { BankExportStatement } from "../../services/banking";
import { SpontaneousSpendingSection } from "./entries/spontaneous/SpontaneousSpendingSection";
import { toEuro } from "../../util/money";

interface Props {
  title: string;
  scheduledExpenses: Record<string, ScheduledExpense>;
  styles: {
    main: string;
    background: string;
    icon: string;
  };
  maxSpending?: number;
  bankEntries: BankExportStatement[];
}

export const CategoryList: FC<Props> = ({
  title,
  scheduledExpenses,
  styles,
  maxSpending,
  bankEntries,
}) => {
  const { main: mainColor, background: bgColor, icon } = styles;
  const listOfScheduledExpenses = Object.values(scheduledExpenses);
  const totalSpent =
    bankEntries.reduce((total, current) => total + current.amount, 0) * -1;

  return (
    <Flex
      minWidth="300px"
      maxWidth="300px"
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
      <Flex
        flexDirection="column"
        width="100%"
        sx={{
          overflowY: "scroll",
        }}
      >
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
                <ScheduledExpenseItem
                  key={key}
                  id={key}
                  content={item}
                  color={mainColor}
                  expenseEntries={bankEntries.filter(
                    (be) => be.plannedExpenseId === item.id,
                  )}
                />
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
        <SpontaneousSpendingSection
          items={bankEntries.filter((be) => !be.plannedExpenseId)}
        />
      </Flex>
    </Flex>
  );
};
