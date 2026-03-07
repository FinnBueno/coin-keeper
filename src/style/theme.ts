import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    events: { main: string; background: string };
    wantToHave: { main: string; background: string };
    life: { main: string; background: string };
    travel: { main: string; background: string };
    food: { main: string; background: string };
    moneyLabel: {
      positive: { main: string; background: string };
      negative: { main: string; background: string };
    };
  }
  interface PaletteOptions {
    events?: { main: string; background: string };
    wantToHave?: { main: string; background: string };
    life?: { main: string; background: string };
    travel?: { main: string; background: string };
    food?: { main: string; background: string };
    moneyLabel: {
      positive: { main: string; background: string };
      negative: { main: string; background: string };
    };
  }
}

export const isDark =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-color-scheme: dark)").matches;

export const theme = createTheme({
  palette: {
    mode: isDark ? "dark" : "light",
    ...(isDark && {
      background: {
        default: "#0f1115",
        paper: "#151922",
      },
      text: {
        primary: "#e6e8ee",
        secondary: "#a6adbb",
      },
      divider: "rgba(255,255,255,0.12)",
    }),
    events: isDark
      ? { main: "#f28b82", background: "#4a1a1a" }
      : {
          main: "#ea4336",
          background: "#fde5e5",
        },
    wantToHave: isDark
      ? { main: "#ffb366", background: "#4a2800" }
      : {
          main: "#ff6d01",
          background: "#fce5cd",
        },
    life: isDark
      ? { main: "#81c995", background: "#1a3a22" }
      : {
          main: "#51b36a",
          background: "#d9ead3",
        },
    travel: isDark
      ? { main: "#8ab4f8", background: "#1a2a4a" }
      : {
          main: "#4285f4",
          background: "#c9dbf8",
        },
    food: isDark
      ? { main: "#d7a8e8", background: "#2e1a3a" }
      : {
          main: "#bf76d1",
          background: "#d4c9ee",
        },
    moneyLabel: isDark
      ? {
          positive: { main: "#81c995", background: "#1a3a22" },
          negative: { main: "#f28b82", background: "#4a1a1a" },
        }
      : {
          positive: { main: "#31c34a", background: "#f6ffe0" },
          negative: { main: "#fa5336", background: "#fdf5f5" },
        },
  },
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
    ...(isDark && {
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#151922",
          },
        },
      },
    }),
  },
});
