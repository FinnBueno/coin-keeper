import type { FC } from "react";
import { useTheme } from "@mui/material";
import { Flex } from "../general/Flex";
import { useDataClient } from "../../context/DatabaseContext";
import {
  mapPlanCategories,
  type PlanCategories,
} from "../../repositories/periodManagement/IPeriodManagementRepository";
import { CategoryList } from "./CategoryList";

const categoryIcons: Record<keyof PlanCategories, string> = {
  events: "🎭",
  wantToHave: "💫",
  life: "🗓️",
  travel: "🚗",
  food: "🥪",
};

export const FinancialTables: FC = () => {
  const { currentPeriod } = useDataClient();
  const { palette } = useTheme();
  if (!currentPeriod) return null;

  const { planning } = currentPeriod!;

  return (
    <Flex
      width="100%"
      maxWidth="100%"
      flexDirection="column"
      position="relative"
      flexGrow={1}
      ml={1}
      sx={{
        overflowX: "auto",
        scrollSnapType: {
          xs: "x mandatory",
          sm: "none",
        },
      }}
    >
      <Flex
        position={"absolute"}
        top={0}
        bottom={0}
        px={1}
        pb={1}
        gap={1}
        sx={{ minWidth: "max-content" }}
      >
        <Flex
          width={{ xs: "40px", sm: "calc((100vw - 1200px) / 2 + 12px)" }}
        ></Flex>
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
            styles={{
              main: palette[categoryId].main,
              background: palette[categoryId].background,
              icon: categoryIcons[categoryId],
            }}
            maxSpending={
              categoryId === "food"
                ? planning.foodBudget
                : categoryId === "travel"
                  ? planning.travelBudget
                  : undefined
            }
          />
        ))}
        <Flex
          width={{ xs: "40px", sm: "calc((100vw - 1200px) / 2 + 12px)" }}
        ></Flex>
      </Flex>
    </Flex>
  );
};
