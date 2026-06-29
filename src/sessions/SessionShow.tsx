import {
  ArrayField,
  Datagrid,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { Button, Box, Paper, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

const BackToEventButton = () => {
  const session = useRecordContext();
  const eventId = session?.event?.id;
  if (!eventId) return null;
  return (
    <Button
      component={Link}
      to={`/events/${eventId}/show`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to Event
    </Button>
  );
};

export const SessionShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <BackToEventButton />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", mt: 1 }}>
        <Paper sx={{ p: 3 }}>
          <TextField source="title" variant="h4" className="text-gradient" sx={{ fontWeight: "800", mb: 2, display: "block" }} />
          <TextField source="description" sx={{ lineHeight: 1.6, display: "block", mb: 3 }} />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>START TIME</Typography>
              <DateField source="startTime" showTime sx={{ fontWeight: "500" }} />
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>END TIME</Typography>
              <DateField source="endTime" showTime sx={{ fontWeight: "500" }} />
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" className="text-gradient" sx={{ mb: 2, fontWeight: "bold" }}>Session Speakers</Typography>
          <ArrayField source="speakers">
            <Datagrid
              bulkActionButtons={false}
              rowClick={(id) => `/speakers/${id}/show`}
              sx={{
                "& .MuiTableRow-root:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.background.paper },
                "& .MuiTableRow-root:nth-of-type(even)": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0b0b14" : "#f9fafb" },
                "& .MuiTableRow-root:hover": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(168, 85, 247, 0.08) !important" : "rgba(59, 130, 246, 0.04) !important" }
              }}
            >
              <TextField source="fullName" label="Name" sx={{ fontWeight: "bold", color: "primary.main" }} />
              <TextField source="bio" label="Bio" />
            </Datagrid>
          </ArrayField>
        </Paper>
      </Box>
    </SimpleShowLayout>
  </Show>
);