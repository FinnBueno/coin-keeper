import { Box } from "@mui/material";

export const Header = () => (
  <Box
    sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
    padding={4}
    display="flex"
    justifyContent="center"
    width="100%"
  >
    Header
  </Box>
);
