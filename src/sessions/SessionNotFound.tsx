import { Box, Typography } from "@mui/material";

export const EmptySessions = () => (
  <Box sx={{ p: 2, textAlign: "center" }}>
    <Typography variant="body2" color="textSecondary">
      No sessions scheduled for this speaker
    </Typography>
  </Box>
);
