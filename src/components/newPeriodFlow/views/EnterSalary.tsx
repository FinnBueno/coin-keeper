import { Button, Input, Typography } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { useFormik } from "formik";
import { useStartNewPeriod } from "../../../context/StartNewPeriodContext";

export const EnterSalaryStep: FlowStepComponent = ({ goNext }) => {
  const { setStartAmount, startAmount } = useStartNewPeriod();

  const formik = useFormik({
    initialValues: {
      salary: startAmount ?? undefined,
    },
    onSubmit: (values) => {
      setStartAmount(values.salary);
      goNext();
    },
  });

  return (
    <Flex flexDirection="column" gap={2}>
      <Typography>Please enter your salary for this month.</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Input
          autoFocus
          startAdornment={<span style={{ fontWeight: "bold" }}>€&nbsp;</span>}
          fullWidth
          id="salary"
          name="salary"
          type="number"
          value={formik.values.salary}
          onChange={formik.handleChange}
        />
      </form>
      <Button onClick={() => formik.handleSubmit()} variant="contained">
        Confirm
      </Button>
    </Flex>
  );
};
