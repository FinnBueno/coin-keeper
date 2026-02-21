import { Box, type BoxProps } from "@mui/material";
import type { FC } from "react";

export const Flex: FC<BoxProps> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);
