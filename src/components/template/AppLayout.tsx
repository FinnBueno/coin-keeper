import { Box } from "@mui/material";
import type { FC, ReactNode } from "react";
import { Header } from "../organism/Header";

interface Props {
  children: ReactNode;
}

export const AppLayout: FC<Props> = ({ children }) => (
  <Box sx={{ width: "100%" }}>
    <Header />
    {children}
  </Box>
);
