import { Box, Button, Link, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { FieldArray, Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { MoneyInput } from "../../general/MoneyInput";
import { months } from "../../../util/months";
import { PlanEntry } from "../plans/PlanEntry";
import { NewPlanInput } from "../plans/NewPlanInput";
import {
  newPlansSchema,
  type NewMonthPlanning,
} from "../../../context/startPeriodTypes";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";

export const PlanningStep: FlowStepComponent = ({ goBack, goNext }) => {
  const { setPlanning, planning } = useStartNewPeriod();

  const handleSubmitted = ({ planInput: _, ...values }: NewMonthPlanning) => {
    setPlanning(values);
    goNext();
  };

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>
        Please fill in everything you already know you'll be spending money on
        the upcoming month (subscriptions automatically carry over).
      </Typography>
      <Formik<NewMonthPlanning>
        initialValues={{
          travelBudget: "" as unknown as number,
          foodBudget: "" as unknown as number,
          plans: [],
          ...(planning ?? {}),
          planInput: {
            title: "",
            type: "exact",
            category: "events",
            amount: 0,
            at: "1",
          },
        }}
        validateOnBlur={false}
        validateOnChange={false}
        validationSchema={toFormikValidationSchema(newPlansSchema)}
        onSubmit={handleSubmitted}
      >
        {({ handleSubmit, values, setFieldValue, validateField }) => (
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
                <FieldArray
                  name="plans"
                  render={(arrayHelpers) => (
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
                        {values.plans?.map((plan, index) => (
                          <PlanEntry
                            key={index}
                            plan={plan}
                            onRemove={() => arrayHelpers.remove(index)}
                            onEdit={() => {
                              arrayHelpers.remove(index);
                              setFieldValue("planInput", {
                                ...plan,
                                at: `${plan.at.dayofmonth}/${months.indexOf(plan.at.month) + 1}`,
                              });
                            }}
                          />
                        ))}
                      </Box>
                      <NewPlanInput />
                    </Flex>
                  )}
                ></FieldArray>
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
      <Button onClick={goBack} color="info" variant="text">
        Go back
      </Button>
    </Flex>
  );
};
