import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiDivider: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.orientation !== "vertical" && {
            marginTop: 8,
            marginBottom: 8,
          }),
          ...(ownerState.orientation === "vertical" && {
            marginLeft: 8,
            marginRight: 8,
          }),
        }),
      },
    },
  },
});
