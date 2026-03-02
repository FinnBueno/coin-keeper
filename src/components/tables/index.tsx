import type { FC } from "react";
import { Flex } from "../general/Flex";
import { useDataClient } from "../../context/DatabaseContext";
import {
  mapPlanCategories,
  type PlanCategories,
} from "../../repositories/periodManagement/IPeriodManagementRepository";
import { CategoryList } from "./CategoryList";

const categoryStyles: Record<
  keyof PlanCategories,
  { main: string; background: string; icon: string }
> = {
  // recurring expenses:
  // main: #fabd05
  // bg: #fff3cc
  events: {
    main: "#ea4336",
    background: "#fde5e5",
    icon: "🎭",
  },
  wantToHave: {
    main: "#ff6d01",
    background: "#fce5cd",
    icon: "💫",
  },
  life: {
    main: "#51b36a",
    background: "#d9ead3",
    icon: "🗓️",
  },
  travel: {
    main: "#4285f4",
    background: "#c9dbf8",
    icon: "🚗",
  },
  food: {
    main: "#bf76d1",
    background: "#d4c9ee",
    icon: "🥪",
  },
};

export const FinancialTables: FC = () => {
  const { currentPeriod } = useDataClient();
  if (!currentPeriod) return null;

  const { planning } = currentPeriod!;

  return (
    <Flex
      // maxWidth="lg"
      width="100%"
      flexDirection="column"
      position="relative"
      flexGrow={1}
      sx={{
        overflowX: "scroll",
      }}
    >
      <Flex position="absolute" px={1} pb={1} gap={1} top={0} bottom={0}>
        <Flex width="calc((100vw - 1200px) / 2 + 12px)"></Flex>
        {mapPlanCategories((categoryId, categoryName) => (
          <CategoryList
            key={categoryId}
            title={categoryName}
            scheduledExpenses={planning.scheduledExpenses
              .map((item, index) => ({ item, index }))
              .filter(({ item }) => item.category === categoryId)
              .reduce(
                (total, { item, index }) => ({
                  ...total,
                  [index]: item,
                }),
                {},
              )}
            bankEntries={currentPeriod.bankEntries.filter(
              (be) => be.category === categoryId,
            )}
            styles={categoryStyles[categoryId]}
            maxSpending={
              categoryId === "food"
                ? planning.foodBudget
                : categoryId === "travel"
                  ? planning.travelBudget
                  : undefined
            }
          />
        ))}
        <Flex width="calc((100vw - 1200px) / 2 + 12px)"></Flex>
      </Flex>
    </Flex>
  );
};
