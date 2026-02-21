import { type TextFieldProps } from "@mui/material";
import type { FC } from "react";
import { TextInput } from "./TextInput";

type Props = {
  name: string;
  label: string;
} & TextFieldProps;

export const MoneyInput: FC<Props> = ({ label, name, ...rest }: Props) => {
  return (
    <TextInput
      label={label}
      name={name}
      type="number"
      slotProps={{
        input: {
          startAdornment: <>€&nbsp;</>,
        },
      }}
    />
  );
};
