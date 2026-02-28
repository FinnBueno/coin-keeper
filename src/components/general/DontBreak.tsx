import { Box } from "@mui/material";
import type { FC, ReactNode } from "react";

interface Props {
  children: ReactNode | string;
}

export const DontBreak: FC<Props> = ({ children }) => (
  <Box component="span" whiteSpace="nowrap">
    {children}
  </Box>
);
