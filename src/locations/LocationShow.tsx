import { Show, SimpleShowLayout, TextField } from "react-admin";
import { Box, Paper, Typography } from "@mui/material";

export const LocationShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", mt: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold", mb: 0.5 }}>Name</Typography>
          <TextField source="name" variant="h4" sx={{ fontWeight: "800", color: "primary.main" }} />
        </Paper>
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>Country</Typography>
              <TextField source="country" sx={{ fontWeight: "500" }} />
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>City</Typography>
              <TextField source="city" sx={{ fontWeight: "500" }} />
            </Box>
          </Box>
        </Paper>
      </Box>
    </SimpleShowLayout>
  </Show>
);
