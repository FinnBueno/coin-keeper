import { Box, Typography } from "@mui/material";
import coinImage from "../../assets/coin.png";

export const Header = () => (
  <Box
    sx={(theme) => ({ backgroundColor: theme.palette.primary.main })}
    py={2}
    display="flex"
    justifyContent="center"
    width="100%"
    mb={2}
    alignItems="center"
    gap={2}
  >
    <Box
      component="img"
      src={coinImage}
      width="48px"
      height="48px"
      sx={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.4))" }}
    />
    <Typography
      variant="h3"
      sx={{
        background:
          "linear-gradient(90deg, #b8860b, #ffd700, #fff8a0, #ffd700, #b8860b)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.4))",
      }}
    >
      Coin Keeper
    </Typography>
  </Box>
);
