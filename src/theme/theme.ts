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
                    backgroundImage: "linear-gradient(to right, #d946ef, #3b82f6, #06b6d4)",
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
        primary: { main: "#3b82f6" },
        secondary: { main: "#a855f7" },
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
                    color: "#1f2937",
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    ...defaultTheme,
    palette: {
        mode: "dark",
        primary: { main: "#3b82f6" },
        secondary: { main: "#a855f7" },
        background: {
            default: "#09090e",
            paper: "#131322",
        },
        text: {
            primary: "#f3f4f6",
            secondary: "#9ca3af",
        },
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
                    backgroundColor: "#131322",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                root: { borderBottom: "1px solid rgba(255, 255, 255, 0.05)" },
                head: {
                    backgroundColor: "#1a1a32",
                    color: "#a855f7",
                    fontWeight: "bold"
                },
            },
        },
    },
});
