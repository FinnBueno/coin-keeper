import { Field, getIn } from "formik";
import type { FC } from "react";

const ErrorMessage: FC<{ name: string }> = ({ name }) => (
  <Field
    name={name}
    render={({ form }: any) => {
      const error = getIn(form.errors, name);
      const touch = getIn(form.touched, name);
      return touch && error ? error : null;
    }}
  />
);
