import {
  ArrayField,
  Datagrid,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { Box, Paper, Typography } from "@mui/material";
import { getImageSource } from "./SpeakerList";

export const SpeakerShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, mt: 2, width: "100%" }}>
        
        <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 250, height: "fit-content" }}>
          <FunctionField
            render={(record) =>
              record.profilePicture?.src ? (
                <Box
                  component="img"
                  src={getImageSource(record.profilePicture.src)}
                  sx={{
                    width: 150,
                    height: 150,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid",
                    borderColor: "primary.main",
                    boxShadow: (theme) => theme.palette.mode === "dark" ? "0px 0px 20px rgba(59, 130, 246, 0.4)" : "none",
                    mb: 2
                  }}
                />
              ) : null
            }
          />
          <TextField source="fullName" sx={{ fontWeight: "bold", fontSize: "1.25rem", textAlign: "center" }} />
        </Paper>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 1, fontWeight: "bold" }}>Biographie</Typography>
            <TextField source="bio" sx={{ lineHeight: 1.6 }} />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 1, fontWeight: "bold" }}>Réseaux Sociaux</Typography>
            <TextField source="socialLinks" />
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 2, fontWeight: "bold" }}>Sessions</Typography>
            <ArrayField source="sessions">
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
              </Datagrid>
            </ArrayField>
          </Paper>
        </Box>

      </Box>
    </SimpleShowLayout>
  </Show>
);