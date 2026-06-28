import { Edit, required, SimpleForm, TextInput } from "react-admin";
import { Typography } from "@mui/material";

export const RoomEdit = () => (
  <Edit redirect="show">
    <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
      <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
        Modifier la Salle
      </Typography>
      <TextInput source="name" validate={[required()]} fullWidth sx={{ mb: 2 }} />
    </SimpleForm>
  </Edit>
);