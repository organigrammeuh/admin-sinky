import {
  ArrayField,
  Datagrid,
  FunctionField,
  Link,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";
import { Box, Button, Paper, Typography } from "@mui/material";
import { getImageSource } from "./SpeakerList";
import { EmptySessions } from "../sessions/SessionNotFound";
import { ArrowBack } from "@mui/icons-material";
const BackToSpeakerList = () => {
  return (
    <Button
      component={Link}
      to={`/speakers`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to speakers list
    </Button>
  );
};

export const SpeakerShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <BackToSpeakerList />
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4, mt: 2, width: "100%" }}>

        <Paper sx={{ p: 3, display: "flex", flexDirection: "column", alignItems: "center", minWidth: 250, height: "fit-content", borderRadius: "12px" }}>
          <FunctionField
            render={(record) =>
              record.profilePicture?.src ? (
                <Box
                  component="img"
                  src={getImageSource(record.profilePicture.src)}
                  sx={{
                    width: 150,
                    height: 150,
                    objectFit: "cover",
                    border: "4px solid",
                    borderColor: "primary.main",
                    mb: 2
                  }}
                />
              ) : null
            }
          />
          <TextField source="fullName" sx={{ fontWeight: "bold", fontSize: "1.25rem", textAlign: "center" }} />
        </Paper>

        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>
          <Paper sx={{ p: 3, borderRadius: "12px" }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 1, fontWeight: "bold" }}>Biographie</Typography>
            <TextField source="bio" sx={{ lineHeight: 1.6, display: "block" }} />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: "12px" }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 1, fontWeight: "bold" }}>
              Réseaux Sociaux
            </Typography>

            <FunctionField
              render={(record) => {
                if (!record?.socialLinks || !Array.isArray(record.socialLinks)) {
                  return (
                    <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                      Aucun lien disponible
                    </Typography>
                  );
                }

                return (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5, mt: 1 }}>
                    {record.socialLinks.map((link: string, index: number) => {
                      let cleanLink = link.trim();
                      if (cleanLink.startsWith("https//")) {
                        cleanLink = cleanLink.replace("https//", "https://");
                      } else if (!cleanLink.startsWith("http://") && !cleanLink.startsWith("https://")) {
                        cleanLink = `https://${cleanLink}`;
                      }

                      return (
                        <Typography
                          key={index}
                          variant="body2"
                          component="a"
                          href={cleanLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            color: "primary.main",
                            textDecoration: "none",
                            width: "fit-content",
                            fontWeight: 500,
                            ":hover": {
                              textDecoration: "underline",
                              color: "secondary.main"
                            }
                          }}
                        >
                          {link}
                        </Typography>
                      );
                    })}
                  </Box>
                );
              }}
            />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: "12px" }}>
            <Typography variant="h6" className="text-gradient" sx={{ mb: 2, fontWeight: "bold" }}>Sessions</Typography>
            <ArrayField source="sessions">
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
            </ArrayField>
          </Paper>
        </Box>

      </Box>
    </SimpleShowLayout>
  </Show>
);