import { Button, MenuItem, Select, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { useInputBankData } from "../../../context/InputBankDataContext";
import { toEuro } from "../../../util/money";
import type { BankExportStatement } from "../../../services/banking";
import { useState, type FC } from "react";
import {
  mapPlanCategories,
  type MonthPlanning,
  type PlanCategory,
} from "../../../repositories/periodManagement/IPeriodManagementRepository";
import { useDataClient } from "../../../context/DatabaseContext";

export const RefineStep: FlowStepComponent = ({ goBack, goNext }) => {
  const { importData } = useInputBankData();
  const { currentPeriod, registerBankEntries } = useDataClient();
  const { planning } = currentPeriod!;

  const setCategoryForEntry = (
    dateId: number,
    entryId: number,
    ctgr: PlanCategory,
  ) => {
    if (importData) {
      importData.dayEntries[dateId].items[entryId].category = ctgr;
      importData.dayEntries[dateId].items[entryId].plannedExpenseId = undefined;
    }
  };

  const setAssociatedPlannedExpenseForEntry = (
    dateId: number,
    entryId: number,
    plannedExpenseId: string,
  ) => {
    if (importData) {
      importData.dayEntries[dateId].items[entryId].plannedExpenseId =
        plannedExpenseId;
    }
  };

  const handleNext = () => {
    if (!importData) return;

    let missingFieldsFound = false;
    outer: for (const day of Object.values(importData?.dayEntries ?? {})) {
      for (const entry of Object.values(day.items)) {
        if (!entry.category) missingFieldsFound = true;
        break outer;
      }
    }

    if (missingFieldsFound) {
      console.log("Not all entries have been assigned to a category!");
      return;
    }

    registerBankEntries(importData);
    goNext();
  };

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="body1">
        Please adjust the parsed data if needed.
      </Typography>
      <Flex
        flexDirection="column"
        gap={2}
        maxHeight="400px"
        sx={{ overflowY: "scroll" }}
      >
        {Object.entries(importData?.dayEntries ?? {}).map(([dayKey, day]) => (
          <Flex key={dayKey} flexDirection="column">
            <Typography variant="h6" fontWeight="bold">
              Day: {day.dateLabel}
            </Typography>
            {Object.entries(day.items).map(([entryKey, entry]) => (
              <RefineEntryLine
                dateId={+dayKey}
                entryId={+entryKey}
                key={`${dayKey}-${entryKey}`}
                entry={entry}
                planning={planning}
                setCategoryForEntry={setCategoryForEntry}
                setAssociatedPlannedExpenseForEntry={
                  setAssociatedPlannedExpenseForEntry
                }
              />
            ))}
          </Flex>
        ))}
      </Flex>
      <Button onClick={handleNext} color="info" variant="contained">
        Done
      </Button>
      <Button onClick={goBack} color="info" variant="outlined">
        Go back
      </Button>
    </Flex>
  );
};

interface RefineEntryLineProps {
  dateId: number;
  entryId: number;
  entry: BankExportStatement;
  planning: MonthPlanning;
  setCategoryForEntry: (
    dateId: number,
    entryId: number,
    category: PlanCategory,
  ) => void;
  setAssociatedPlannedExpenseForEntry: (
    dateId: number,
    entryId: number,
    plannedExpenseId: string,
  ) => void;
}

const RefineEntryLine: FC<RefineEntryLineProps> = ({
  dateId,
  entryId,
  entry,
  planning,
  setCategoryForEntry,
  setAssociatedPlannedExpenseForEntry,
}) => {
  const [category, setCategory] = useState<PlanCategory | undefined>();
  const [associatedScheduledExpense, setAssociatedScheduledExpense] = useState<
    string | undefined
  >();

  const updateCategory = (ctgr: PlanCategory) => {
    setCategory(ctgr);
    setAssociatedScheduledExpense(undefined);
    setCategoryForEntry(dateId, entryId, ctgr);
  };

  return (
    <Flex py={1} alignItems="center" gap={1}>
      <Select
        sx={{ width: "120px" }}
        value={category ?? ""}
        onChange={(e) => updateCategory(e.target.value as PlanCategory)}
      >
        {mapPlanCategories((key, value) => (
          <MenuItem key={key} value={key}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <Select
        sx={{ width: "120px" }}
        value={associatedScheduledExpense ?? ""}
        onChange={(e) => {
          setAssociatedScheduledExpense(e.target.value as string);
          setAssociatedPlannedExpenseForEntry(
            dateId,
            entryId,
            e.target.value as string,
          );
        }}
      >
        <MenuItem value={""}>None</MenuItem>
        {planning.scheduledExpenses
          .filter((se) => se.category === category)
          .map((se) => (
            <MenuItem key={se.id} value={se.id}>
              {se.title}
            </MenuItem>
          ))}
      </Select>
      <Flex flexDirection="column">
        <Typography>{entry.title}</Typography>
        <Typography>{toEuro(entry.amount)}</Typography>
      </Flex>
    </Flex>
  );
};
