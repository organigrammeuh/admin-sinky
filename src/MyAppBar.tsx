import { AppBar, UserMenu } from "react-admin";
import { Typography, Box } from "@mui/material";
import type { AppBarProps } from "react-admin";

export const MyAppBar = (props: AppBarProps) => (
  <AppBar
    {...props}
    sx={{
      bgcolor: "background.paper",
      borderBottom: "1px solid",
      borderColor: "divider",
    }}
    square
    elevation={0}
    userMenu={<UserMenu />}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          backgroundImage:
            "linear-gradient(to right, #d946ef, #3b82f6, #06b6d4)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Admin Sinky
      </Typography>
    </Box>
    <Box sx={{ flexGrow: 1 }} />
  </AppBar>
);
