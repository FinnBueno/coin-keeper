import { Box, Button, Link, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { MoneyInput } from "../../general/MoneyInput";
import { PlanEntry } from "../scheduleExpense/ScheduledExpenseEntry";
import { NewScheduledExpense } from "../scheduleExpense/NewScheduledExpenseInput";
import { type ScheduledExpense } from "../../../context/startPeriodTypes";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";
import { months } from "../../../util/months";
import { useState } from "react";
import { z } from "zod";

export const budgetInputSchema = z.object({
  travelBudget: z.coerce.number("Required").gt(0, "Car won't fuel itself"),
  foodBudget: z.coerce.number("Required").gt(0, "You gotta eat something"),
});

export type BudgetInput = z.infer<typeof budgetInputSchema>;

export const PlanningStep: FlowStepComponent = ({ goBack, goNext }) => {
  const { setPlanning, planning } = useStartNewPeriod();

  const handleSubmitted = (values: BudgetInput) => {
    setPlanning((oldState) => {
      return {
        ...oldState,
        ...values,
      };
    });
    goNext();
  };

  const removeScheduledExpense = (expense: ScheduledExpense) =>
    setPlanning((oldState) => ({
      ...oldState,
      scheduledExpenses: oldState?.scheduledExpenses.filter(
        (pl) => pl !== expense,
      ),
    }));

  const addScheduledExpense = (expense: ScheduledExpense) => {
    setPlanning((oldState) => ({
      ...oldState,
      scheduledExpenses: [...oldState.scheduledExpenses, expense],
    }));
  };

  const [initialFillValues, setInitialFillValues] = useState<
    Omit<ScheduledExpense, "at"> & { at: string }
  >();

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>
        Please fill in everything you already know you'll be spending money on
        the upcoming month (subscriptions automatically carry over).
      </Typography>
      <Formik<BudgetInput>
        initialValues={{
          travelBudget: planning?.travelBudget ?? ("" as unknown as number),
          foodBudget: planning?.foodBudget ?? ("" as unknown as number),
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={toFormikValidationSchema(budgetInputSchema)}
        onSubmit={handleSubmitted}
      >
        {({ handleSubmit, validateField }) => (
          <Box
            component="form"
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit}
            width="100%"
            gap={2}
          >
            <Flex gap={2}>
              <MoneyInput
                autoFocus
                label="🚗 Travel Budget"
                name="travelBudget"
                onBlur={() => validateField("travelBudget")}
              />
              <MoneyInput
                label="🥪 Food Budget"
                name="foodBudget"
                onBlur={() => validateField("foodBudget")}
              />
            </Flex>
            <Flex flexDirection="column">
              <Typography variant="h6">Plans</Typography>
              <Typography variant="subtitle2">
                <Link href="https://calendar.google.com" target="_blank">
                  Open your calendar
                </Link>{" "}
                and see what you've got planned this month.
              </Typography>
              <Flex mt={2} gap={2} width="100%" justifyContent="center">
                <Flex flexDirection="column" width="100%">
                  <Box
                    display="grid"
                    alignItems="center"
                    columnGap={2}
                    gridTemplateColumns={
                      "1fr min-content min-content min-content"
                    }
                    mb={2}
                  >
                    {planning?.scheduledExpenses?.map((plan, index) => (
                      <PlanEntry
                        key={index}
                        plan={plan}
                        onRemove={() => removeScheduledExpense(plan)}
                        onEdit={() => {
                          removeScheduledExpense(plan);
                          setInitialFillValues({
                            ...plan,
                            at: `${plan.at.dayofmonth}/${months.indexOf(plan.at.month) + 1}`,
                          });
                        }}
                      />
                    ))}
                  </Box>
                </Flex>
              </Flex>
            </Flex>
            <Button
              type="submit"
              color="info"
              variant="contained"
              fullWidth
              onClick={() => {
                handleSubmit();
              }}
            >
              All done
            </Button>
          </Box>
        )}
      </Formik>
      <NewScheduledExpense
        onAddScheduledExpense={addScheduledExpense}
        initialValues={initialFillValues}
      />
      <Button onClick={goBack} color="info" variant="text">
        Go back
      </Button>
    </Flex>
  );
};
