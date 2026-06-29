import {
  Datagrid,
  DeleteButton,
  EditButton,
  List,
  TextInput,
  TextField,
} from "react-admin";
import { Box } from "@mui/material";

const locationFilters = [
  <TextInput source="name" label="Search by name" alwaysOn />,
  <TextInput source="country" label="Search by country" alwaysOn />,
  <TextInput source="city" label="Search by city" alwaysOn />,
];

export const LocationList = () => (
  <List filters={locationFilters} sx={{ "& .RaList-main": { marginTop: 2 } }}>
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
      <TextField source="name" label="Name" sx={{ fontWeight: "bold", color: "primary.main" }} />
      <TextField source="country" label="Country" />
      <TextField source="city" label="City" />
      <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
        <EditButton color="primary" />
        <DeleteButton color="error" />
      </Box>
    </Datagrid>
  </List>
);
