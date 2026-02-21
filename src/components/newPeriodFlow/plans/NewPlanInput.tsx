import { useRef, type FC, type KeyboardEventHandler } from "react";
import { Flex } from "../../general/Flex";
import { MenuItem } from "@mui/material";
import { TextInput } from "../../general/TextInput";
import { Selectable } from "../../general/Selectable";
import { useFormikContext } from "formik";
import type { NewMonthPlanning } from "../../../context/startPeriodTypes";
import { parseEasyDate } from "../../../util/easyDates";

// todo: probably should make this component its own form
const convertPlanInputToPlan = (planInput: NewMonthPlanning["planInput"]) => ({
  ...planInput,
  at: parseEasyDate(planInput.at),
});

export const NewPlanInput: FC = () => {
  const { values, setValues, validateForm, setFieldTouched } =
    useFormikContext<NewMonthPlanning>();

  const firstInputRef = useRef<HTMLInputElement>(undefined);

  const setTouched = (touched: boolean) => {
    setFieldTouched("planInput.title", touched);
    setFieldTouched("planInput.type", touched);
    setFieldTouched("planInput.category", touched);
    setFieldTouched("planInput.amount", touched);
    setFieldTouched("planInput.at", touched);
  };

  const handleFinalTab: KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = async (event) => {
    if ((event.key === "Tab" && !event.shiftKey) || event.key === "Enter") {
      setTouched(true);
      const validationResult = await validateForm(values);
      const errorReasons = Object.keys(validationResult.planInput ?? {}).map(
        (item) => !!item,
      );
      const plan = convertPlanInputToPlan(values.planInput);
      if (errorReasons.length === 0) {
        setValues({
          ...values,
          plans: [...values.plans, plan],
          planInput: {
            title: "",
            type: "exact",
            category: "events",
            amount: 0,
            at: "",
          },
        });
        console.log("Bring focus");
        firstInputRef.current?.focus();
        setTouched(false);
      }
      event.preventDefault();
    }
  };

  return (
    <Flex width="100%" gap={1}>
      <TextInput
        name="planInput.title"
        label="Name"
        slotProps={{ htmlInput: { ref: firstInputRef } }}
      />
      <Selectable name="planInput.type" label="Type" defaultValue={"exact"}>
        <MenuItem value={"exact"}>Exact</MenuItem>
        <MenuItem value={"up_to"}>Up to</MenuItem>
      </Selectable>
      <Selectable
        name="planInput.category"
        label="Category"
        defaultValue={"food"}
      >
        <MenuItem value={"food"}>Food</MenuItem>
        <MenuItem value={"travel"}>Travel</MenuItem>
        <MenuItem value={"want_to_have"}>Want to have</MenuItem>
        <MenuItem value={"events"}>Events</MenuItem>
        <MenuItem value={"life"}>Life</MenuItem>
      </Selectable>
      <TextInput
        type="number"
        name="planInput.amount"
        label="Amount"
        slotProps={{
          input: {
            startAdornment: <>€&nbsp;</>,
          },
        }}
      />
      <TextInput
        name="planInput.at"
        label="Date"
        slotProps={{
          input: {
            onKeyDown: handleFinalTab,
          },
        }}
      />
    </Flex>
  );
};
