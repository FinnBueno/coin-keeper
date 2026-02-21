import { Box } from "@mui/material";

export const Header = () => (
  <Box
    sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
    padding={3}
    display="flex"
    justifyContent="center"
    width="100%"
    mb={2}
  >
    Header
  </Box>
);
