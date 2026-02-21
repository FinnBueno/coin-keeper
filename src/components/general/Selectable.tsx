import {
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  type SelectProps,
} from "@mui/material";
import { useField } from "formik";
import type { FC, ReactNode } from "react";

type Props = {
  name: string;
  label?: string;
  children: ReactNode;
} & SelectProps;

export const Selectable: FC<Props> = ({
  label,
  name,
  children,
  ...rest
}: Props) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl fullWidth>
      {label && <InputLabel id={`${name}-label`}>{label}</InputLabel>}
      <Select
        labelId={`${name}-label`}
        id={name}
        label={label}
        fullWidth
        {...field}
        {...rest}
      >
        {children}
      </Select>
    </FormControl>
  );
};
