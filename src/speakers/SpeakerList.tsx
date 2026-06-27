import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextInput,
  TextField,
} from "react-admin";
import { Box } from "@mui/material";

const speakerFilters = [
  <TextInput source="full_name" label="Search by full name" alwaysOn />,
];

export const getImageSource = (url: string) => {
  return url.startsWith("http") ? url : "http://localhost:3000/" + url;
};

export const SpeakerList = () => (
  <List filters={speakerFilters} sx={{ "& .RaList-main": { marginTop: 2 } }}>
    <Datagrid 
      rowClick="show" 
      bulkActionButtons={false}
      sx={{
        "& .MuiTableRow-root:nth-of-type(odd)": {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
        "& .MuiTableRow-root:nth-of-type(even)": {
          backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0b0b14" : "#f9fafb",
        },
        "& .MuiTableRow-root:hover": {
          backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(168, 85, 247, 0.08) !important" : "rgba(59, 130, 246, 0.04) !important",
        }
      }}
    >

      <TextField source="fullName" label="Nom Complet" sx={{ fontWeight: "bold", color: "primary.main" }} />
      
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <EditButton color="primary" />
        <DeleteButton color="error" />
      </Box>
    </Datagrid>
  </List>
);
