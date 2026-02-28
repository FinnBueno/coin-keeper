import { Alert, Button, Typography } from "@mui/material";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { useSavingCalculations } from "../../../hooks/useSavingCalculations";
import { toEuro } from "../../../util/money";
import { toPercentage } from "../../../util/percentage";
import { Dangerous } from "@mui/icons-material";
import { useDataClient } from "../../../context/DatabaseContext";

export const ConfirmationStep: FlowStepComponent = ({ goNext, goBack }) => {
  const { startNewPeriod } = useDataClient();

  const { startAmount, planning } = useStartNewPeriod();

  const { toSharedAccount, toPersonalAccount, personalSpending } =
    useSavingCalculations(startAmount);

  if (!planning) return null;

  const { travelBudget, foodBudget, scheduledExpenses } = planning;

  const travelBudgetPercentage = toPercentage(personalSpending, travelBudget);
  const foodBudgetPercentage = toPercentage(personalSpending, foodBudget);

  const scheduledTravelExpenses = scheduledExpenses
    .filter((se) => se.category === "travel")
    .reduce((total, next) => total + next.amount, 0);
  const scheduledFoodExpenses = scheduledExpenses
    .filter((se) => se.category === "food")
    .reduce((total, next) => total + next.amount, 0);

  const scheduledTravelExpensesPercentage = toPercentage(
    travelBudget,
    scheduledTravelExpenses,
  );
  const scheduledFoodExpensesPercentage = toPercentage(
    foodBudget,
    scheduledFoodExpenses,
  );

  const totalReservedCosts =
    scheduledExpenses
      .filter((i) => i.category !== "food" && i.category !== "travel")
      .reduce((total, next) => total + next.amount, 0) +
    foodBudget +
    travelBudget;
  const totalScheduledCostsPercentage = toPercentage(
    personalSpending,
    totalReservedCosts,
  );

  const handleStart = () => {
    startNewPeriod(
      startAmount,
      toSharedAccount,
      toPersonalAccount,
      personalSpending,
      planning!,
    );
    goNext();
  };

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>You've got {toEuro(startAmount)} for this month.</Typography>
      <Typography>
        You're saving {toEuro(toSharedAccount)} to your joint accoint, and{" "}
        {toEuro(toPersonalAccount)} to your personal account.
      </Typography>
      <Typography>
        You'll have {toEuro(personalSpending)} to spend for yourself.
      </Typography>
      <Typography variant="h6">Fund allocations</Typography>
      <Typography>
        🥪 For food, you've allocated {toEuro(foodBudget)} (
        {foodBudgetPercentage} of your total spending).
        <br />
        {toEuro(scheduledFoodExpenses)} of that budget is pre-allocated (
        {scheduledFoodExpensesPercentage} of your food budget)
      </Typography>
      {scheduledFoodExpenses > foodBudget ? (
        <Alert icon={<Dangerous fontSize="inherit" />} severity="error">
          Your scheduled food expenses are higher (
          {toEuro(scheduledFoodExpenses - foodBudget)}) than the amount you
          allocated to food. Please review the previous steps.
        </Alert>
      ) : null}
      <Typography>
        🚗 For travel, you've allocated {toEuro(travelBudget)} (
        {travelBudgetPercentage} of your total spending).
        <br />
        {toEuro(scheduledTravelExpenses)} of that budget is pre-allocated (
        {scheduledTravelExpensesPercentage} of your travel budget)
      </Typography>
      {scheduledTravelExpenses > travelBudget ? (
        <Alert icon={<Dangerous fontSize="inherit" />} severity="error">
          Your scheduled travel expenses are higher (
          {toEuro(scheduledTravelExpenses - travelBudget)}) than the amount you
          allocated to travel. Please review the previous steps.
        </Alert>
      ) : null}
      <Typography>
        Your scheduled events (including food and travel) total{" "}
        {toEuro(totalReservedCosts)} ({totalScheduledCostsPercentage}), leaving
        you with {toEuro(personalSpending - totalReservedCosts)} of unallocated
        funds.
        {personalSpending - totalReservedCosts >= 100
          ? " Don't spend it all in one place!"
          : ""}
      </Typography>
      {totalReservedCosts > personalSpending ? (
        <Alert icon={<Dangerous fontSize="inherit" />} severity="error">
          Your scheduled expenses are higher (
          {toEuro(totalReservedCosts - personalSpending)}) than your personal
          spending. Please review the previous steps.
        </Alert>
      ) : null}
      <Button color="info" variant="contained" fullWidth onClick={handleStart}>
        Start new period
      </Button>
      <Button onClick={goBack} color="info" variant="text">
        Go back
      </Button>
    </Flex>
  );
};
