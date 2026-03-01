import { Box, type BoxProps } from "@mui/material";
import type { FC, SubmitEventHandler } from "react";

export const Flex: FC<BoxProps & { onSubmit?: SubmitEventHandler<unknown> }> = ({ children, ...props }) => (
  <Box display="flex" {...props}>
    {children}
  </Box>
);
