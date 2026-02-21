import { Box } from "@mui/material";
import type { FC, ReactNode } from "react";
import { Header } from "../general/Header";

interface Props {
  children: ReactNode;
}

export const AppLayout: FC<Props> = ({ children }) => (
  <Box sx={{ width: "100%" }}>
    <Header />
    <Box display="flex" justifyContent="center" width="100%">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        {children}
      </Box>
    </Box>
  </Box>
);
