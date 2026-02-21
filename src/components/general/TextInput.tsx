import { TextField, type TextFieldProps } from "@mui/material";
import { useField } from "formik";
import type { FC } from "react";

type Props = {
  name: string;
  label?: string;
} & Omit<TextFieldProps, "name">;

export const TextInput: FC<Props> = ({ label, name, ...rest }: Props) => {
  const [field, meta] = useField(name);
  const showError = !!(meta.error && meta.touched);

  return (
    <TextField
      id={name}
      label={label}
      fullWidth
      {...field}
      {...rest}
      error={showError}
      helperText={showError ? meta.error : rest.helperText}
    />
  );
};
