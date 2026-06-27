import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  FunctionField,
  useRecordContext,
  DeleteButton,
} from "react-admin";
import { Link } from "react-router-dom";
import { Button, Box, Paper, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";

const CreateSessionButton = () => {
  const event = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/sessions/create?eventId=${event?.id}`}
      startIcon={<AddIcon />}
      variant="contained"
      color="primary"
      size="small"
      sx={{ mb: 2 }}
    >
      Add Session
    </Button>
  );
};

const BackToEventList = () => {
  return (
    <Button
      component={Link}
      to={`/events`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to events list
    </Button>
  );
};

const SessionsSection = () => {
  const event = useRecordContext();
  return (
    <Paper sx={{ p: 3, mt: 3, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6" className="text-gradient" sx={{ fontWeight: "bold" }}>
          Sessions Planifiées
        </Typography>
        <CreateSessionButton />
      </Box>

      <ReferenceManyField
        reference="sessions"
        target="eventId"
        label=""
      >
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id) => `/sessions/${id}/show`}
          sx={{
            "& .MuiTableRow-root:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.background.paper },
            "& .MuiTableRow-root:nth-of-type(even)": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0b0b14" : "#f9fafb" },
            "& .MuiTableRow-root:hover": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(168, 85, 247, 0.08) !important" : "rgba(59, 130, 246, 0.04) !important" }
          }}
        >
          <TextField source="title" sx={{ fontWeight: "bold", color: "primary.main" }} />
          <TextField source="room.name" label="Room" />
          <DateField source="startTime" showTime />
          <FunctionField
            onClick={(e) => e.stopPropagation()}
            render={(session: any) => (
              <Button
                component={Link}
                to={`/sessions/${session?.id}?eventId=${event?.id}`}
                size="small"
                startIcon={<EditIcon />}
                color="primary"
              >
                Edit
              </Button>
            )}
          />
          <DeleteButton
            onClick={(e) => e.stopPropagation()}
            redirect={`/events/${event!.id}/show`}
            color="error"
          />
        </Datagrid>
      </ReferenceManyField>
    </Paper>
  );
  

}; export const EventShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <BackToEventList />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", mt: 1 }}>
        <Paper sx={{ p: 3 }}>
          <TextField source="title" variant="h4" className="text-gradient" sx={{ fontWeight: "800", mb: 2, display: "block" }} />
          <TextField source="description" sx={{ lineHeight: 1.6, display: "block", mb: 3 }} />

          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, borderTop: "1px solid", borderColor: "divider", pt: 2 }}>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>DATE DE DÉBUT</Typography>
              <DateField source="startDate" sx={{ fontWeight: "500" }} />
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>DATE DE FIN</Typography>
              <DateField source="endDate" sx={{ fontWeight: "500" }} />
            </Box>
            <Box>
              <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold" }}>LIEU</Typography>
              <TextField source="location" sx={{ fontWeight: "500", color: "secondary.main" }} />
            </Box>
          </Box>
        </Paper>

        <SessionsSection />
      </Box>
    </SimpleShowLayout>
  </Show>
);