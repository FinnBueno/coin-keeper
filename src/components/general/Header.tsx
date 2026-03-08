import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import coinImage from "../../assets/coin.png";
import { Flex } from "./Flex";
import { Settings } from "@mui/icons-material";
import { useState } from "react";
import { AppModal } from "./AppModal";
import { SettingsView } from "../settings/SettingsView";

export const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          width: "100%",
          maxWidth: "lg",
          mx: "auto",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Flex alignItems="center" gap={2}>
          <Box
            component="img"
            src={coinImage}
            width="36px"
            height="36px"
            sx={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.4))" }}
          />
          <Typography
            variant="h4"
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
        </Flex>
        <IconButton onClick={handleOpen}>
          <Settings fontSize="medium" />
        </IconButton>
        <AppModal open={open} onClose={handleClose}>
          <SettingsView onClose={handleClose} />
        </AppModal>
      </Toolbar>
    </AppBar>
  );
};
