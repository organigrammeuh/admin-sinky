import { defaultTheme } from "react-admin";
import { createTheme } from "@mui/material/styles";

const commonComponents = {
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 0,
        boxShadow: "none",
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: "10px",
        textTransform: "none" as const,
        fontWeight: 600,
        paddingBlock: 10,
        paddingInline: 24,
      },
    },
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        "&.text-gradient": {
          backgroundImage:
            "linear-gradient(to right, #d946ef, #3b82f6, #06b6d4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          display: "inline-block",
        },
      },
    },
  },
};

export const lightTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "light",
    primary: { main: "#594fd7", contrastText: "#ffffff" },
    secondary: { main: "#576be8", contrastText: "#ffffff" },
    error: { main: "#df2225" },
    success: { main: "#00a327" },
    background: {
      default: "#f1f1f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#080811",
      secondary: "#61626f",
    },
    divider: "#d5d7e2",
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
  components: {
    ...commonComponents,
    MuiAppBar: {
      styleOverrides: {
        colorSecondary: {
          backgroundColor: "#ffffff",
          color: "#080811",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...defaultTheme,
  palette: {
    mode: "dark",
    primary: { main: "#7d7df9", contrastText: "#020202" },
    secondary: { main: "#c16dcc", contrastText: "#020202" },
    error: { main: "#ff6367" },
    success: { main: "#39c34b" },
    background: {
      default: "#020202",
      paper: "#07070b",
    },
    text: {
      primary: "#f2f2f2",
      secondary: "#797a80",
    },
    divider: "rgba(255, 255, 255, 0.09)",
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
  },
  components: {
    ...commonComponents,
    MuiPaper: {
      styleOverrides: {
        root: {
          ...commonComponents.MuiPaper.styleOverrides.root,
          backgroundColor: "#07070b",
          border: "1px solid rgba(255, 255, 255, 0.08)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: { borderBottom: "1px solid rgba(255, 255, 255, 0.09)" },
        head: {
          backgroundColor: "#111116",
          color: "#c16dcc",
          fontWeight: "bold",
        },
      },
    },
  },
});
