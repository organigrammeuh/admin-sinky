import { ReferenceManyField, Datagrid, Show, SimpleShowLayout, TextField, Link } from "react-admin";
import { Box, Paper, Typography, Button } from "@mui/material";
import { EmptySessions } from "../sessions/SessionNotFound";
import { ArrowBack } from "@mui/icons-material";

const BackToRoomList = () => {
  return (
    <Button
      component={Link}
      to={`/rooms`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to roms list
    </Button>
  );
};


export const RoomShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <BackToRoomList />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: "100%", mt: 1 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="caption" color="textSecondary" sx={{ display: "block", fontWeight: "bold", mb: 0.5 }}>NOM DE LA SALLE</Typography>
          <TextField source="name" variant="h4" sx={{ fontWeight: "800", color: "primary.main" }} />
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" className="text-gradient" sx={{ mb: 2, fontWeight: "bold" }}>Sessions Associées</Typography>
          <ReferenceManyField reference="sessions" target="roomId" label="">
            <Datagrid
              bulkActionButtons={false}
              rowClick={(id) => `/sessions/${id}/show`}
              empty={<EmptySessions />}
              sx={{
                "& .MuiTableRow-root:nth-of-type(odd)": { backgroundColor: (theme) => theme.palette.background.paper },
                "& .MuiTableRow-root:nth-of-type(even)": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0b0b14" : "#f9fafb" },
                "& .MuiTableRow-root:hover": { backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(168, 85, 247, 0.08) !important" : "rgba(59, 130, 246, 0.04) !important" }
              }}
            >
              <TextField source="title" sx={{ fontWeight: "bold", color: "primary.main" }} />
            </Datagrid>
          </ReferenceManyField>
        </Paper>
      </Box>
    </SimpleShowLayout>
  </Show>
);