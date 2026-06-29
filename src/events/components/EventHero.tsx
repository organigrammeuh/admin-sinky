import { useRecordContext, DateField } from "react-admin";
import { Box, Paper, Typography } from "@mui/material";
import { StatusBadge } from "./StatusBadge";

export const EventHero = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Paper
      sx={{
        p: 3,
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
        <Box>
          <Typography sx={{ fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.3 }}>
            {record.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mt: 0.3, fontSize: "0.85rem" }}>
            {record.location}
          </Typography>
        </Box>
        <StatusBadge />
      </Box>

      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em", display: "block", mb: 0.2 }}>
            Start
          </Typography>
          <Typography sx={{ fontSize: "0.88rem", fontWeight: 500 }}>
            <DateField source="startDate" locales="en-US" />
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="textSecondary" sx={{ fontWeight: 600, textTransform: "uppercase", fontSize: "0.65rem", letterSpacing: "0.05em", display: "block", mb: 0.2 }}>
            End
          </Typography>
          <Typography sx={{ fontSize: "0.88rem", fontWeight: 500 }}>
            <DateField source="endDate" locales="en-US" />
          </Typography>
        </Box>
      </Box>

      {record.description && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 2, lineHeight: 1.6, fontSize: "0.85rem" }}>
          {record.description}
        </Typography>
      )}
    </Paper>
  );
};
