import { Box, Typography } from "@mui/material";
import type { FC } from "react";

export const BalanceInfo: FC = () => {
  return (
    <Box display="flex" justifyContent="flex-start" flexDirection="column">
      <Typography variant="h5" mb={2}>
        You're currently on{" "}
        <span style={{ fontWeight: "bold" }}>January's</span> salary.
      </Typography>
      <Typography variant="h5">Current balance</Typography>
      <Typography variant="h2" fontWeight="bold">
        € 123,45
      </Typography>
    </Box>
  );
};
