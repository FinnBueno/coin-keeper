import { Button, Typography, Link, TextareaAutosize } from "@mui/material";
import type { FlowStepComponent } from "./FlowStepType";
import { Flex } from "../../general/Flex";
import { useFormik } from "formik";
import { useInputBankData } from "../../../context/InputBankDataContext";

export const InputDataStep: FlowStepComponent = ({ goNext }) => {
  const { setSourceHtml } = useInputBankData();

  const formik = useFormik({
    initialValues: {
      htmlInput: "",
    },
    onSubmit: (values) => {
      setSourceHtml(values.htmlInput);
      goNext();
    },
  });
  return (
    <Flex flexDirection="column" gap={2}>
      <Typography variant="body1">
        <Link
          href="https://www.snsbank.nl/online/web/mijnsns/rekening/9139162?tab=bij-af"
          target="_blank"
        >
          Click here
        </Link>{" "}
        to open your banking environment
      </Typography>
      <Flex
        component="form"
        flexDirection="column"
        onSubmit={(e) => {
          formik.handleSubmit();
          e.preventDefault();
        }}
        gap={2}
      >
        <Typography>
          After scrolling to the most recent import date, paste the HTML from
          your banking environment in here.
        </Typography>
        <TextareaAutosize
          name="htmlInput"
          id="htmlInput"
          minRows={5}
          maxRows={5}
          value={formik.values.htmlInput}
          onChange={formik.handleChange}
        />
        <Button type="submit" color="info" variant="contained">
          Done
        </Button>
      </Flex>
    </Flex>
  );
};
