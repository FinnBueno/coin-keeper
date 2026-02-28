import { useEffect, useRef, type FC } from "react";
import { Flex } from "../../general/Flex";
import { MenuItem } from "@mui/material";
import { TextInput } from "../../general/TextInput";
import { Selectable } from "../../general/Selectable";
import { Formik } from "formik";
import {
  mapPlanCategories,
  mapPlanTypes,
  planCategories,
  planTypes,
  type ScheduledExpense,
} from "../../../repositories/periodManagement/IPeriodManagementRepository";
import { parseEasyDate } from "../../../util/easyDates";
import { z } from "zod";
import {
  indexedMonthMaxDays,
  monthMaxDays,
  months,
} from "../../../util/months";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { typedObjectKeys } from "../../../util/types";

const convertInputToScheduledExpense = (
  planInput: ScheduledExpenseInput,
): ScheduledExpense => ({
  ...planInput,
  at: parseEasyDate(planInput.at),
});

const dateInputSchema = z.string("Required").refine(
  (value) => {
    if (value.includes("/")) {
      const [day, month] = value.split("/");
      if (!day || !month) return false;
      if (isNaN(+month)) return false;
      if (isNaN(+day)) return false;
      const monthNumber = +month;
      const dayNumber = +day;
      if (monthNumber < 0 || monthNumber > 12) return false;
      const daysForMonth = indexedMonthMaxDays[monthNumber - 1]();
      if (dayNumber < 0 || dayNumber > daysForMonth) return false;
      return true;
    } else {
      if (isNaN(+value)) return false;

      const today = new Date();
      const currentDay = today.getDate();
      // if the input day is higher than or equal to the current day, assume it's the current month
      // if the input day is lower than the current day, assume it's the next month
      let month;
      if (+value >= currentDay) {
        month = months[today.getMonth() % 12];
      } else {
        month = months[(today.getMonth() + 1) % 12];
      }
      return +value > 0 && +value <= monthMaxDays[month]();
    }
  },
  {
    message: "Invalid",
  },
);

export type ScheduledExpenseDate = z.infer<typeof dateInputSchema>;

const scheduledExpenseInputSchema = z.object({
  title: z.string("Required"),
  type: z.enum(typedObjectKeys(planTypes), "Invalid"),
  category: z.enum(typedObjectKeys(planCategories), "Invalid"),
  amount: z.coerce.number("Required").gt(0, "Too low"),
  at: dateInputSchema,
});

type ScheduledExpenseInput = z.infer<typeof scheduledExpenseInputSchema>;

const emptyScheduledExpense: ScheduledExpenseInput = {
  title: "",
  type: "exact",
  category: "events",
  amount: 0,
  at: "",
};

type Props = {
  initialValues?: ScheduledExpenseInput;
  onAddScheduledExpense: (scheduledExpense: ScheduledExpense) => void;
};

const InitialValueUpdater: FC<
  Pick<Props, "initialValues"> & {
    onValuesUpdated: (values: ScheduledExpenseInput) => void;
  }
> = ({ initialValues, onValuesUpdated }) => {
  useEffect(() => {
    if (!initialValues) return;
    onValuesUpdated(initialValues);
  }, [initialValues]);
  return null;
};

export const NewScheduledExpense: FC<Props> = ({
  initialValues,
  onAddScheduledExpense,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(undefined);

  return (
    <Formik<ScheduledExpenseInput>
      initialValues={initialValues ?? emptyScheduledExpense}
      validateOnBlur={false}
      validateOnChange={false}
      validationSchema={toFormikValidationSchema(scheduledExpenseInputSchema)}
      onSubmit={async (
        values,
        { validateForm, setValues, setTouched, resetForm },
      ) => {
        setTouched({
          title: true,
          type: true,
          category: true,
          amount: true,
          at: true,
        });
        const validationResult = await validateForm(values);
        const errorReasons = Object.keys(validationResult ?? {}).map(
          (item) => !!item,
        );
        if (errorReasons.length === 0) {
          const scheduledExpense = convertInputToScheduledExpense(values);
          setValues(emptyScheduledExpense);
          onAddScheduledExpense(scheduledExpense);
          firstInputRef.current?.focus();
          resetForm();
        }
      }}
    >
      {({ handleSubmit, touched, validateField, setValues }) => (
        <Flex component="form" width="100%" gap={1}>
          {/* this is really ugly, but I can't be bothered to make the whole form controlled */}
          <InitialValueUpdater
            initialValues={initialValues}
            onValuesUpdated={(val) => {
              setValues(val);
              firstInputRef.current?.focus();
            }}
          />
          <TextInput
            name="title"
            label="Name"
            onBlur={() => touched["title"] && validateField("title")}
            slotProps={{ htmlInput: { ref: firstInputRef } }}
          />
          <Selectable
            name="type"
            label="Type"
            defaultValue={"exact"}
            onBlur={() => touched["type"] && validateField("type")}
          >
            {mapPlanTypes((key, value) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Selectable>
          <Selectable
            name="category"
            label="Category"
            defaultValue={"food"}
            onBlur={() => touched["category"] && validateField("category")}
          >
            {mapPlanCategories((key, value) => (
              <MenuItem value={key}>{value}</MenuItem>
            ))}
          </Selectable>
          <TextInput
            type="number"
            name="amount"
            label="Amount"
            onBlur={() => touched["amount"] && validateField("amount")}
            slotProps={{
              input: {
                startAdornment: <>€&nbsp;</>,
              },
            }}
          />
          <TextInput
            name="at"
            label="Date"
            slotProps={{
              input: {
                onKeyDown: (event) => {
                  if (
                    (event.key === "Tab" && !event.shiftKey) ||
                    event.key === "Enter"
                  ) {
                    handleSubmit();
                    event.preventDefault();
                  }
                },
              },
            }}
          />
        </Flex>
      )}
    </Formik>
  );
};
