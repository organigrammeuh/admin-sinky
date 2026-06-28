import { Create, required, SimpleForm, TextInput } from "react-admin";
import { Typography } from "@mui/material";

export const RoomCreate = () => (
  <Create redirect="show">
    <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
      <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
        Créer une Salle
      </Typography>
      <TextInput source="name" validate={[required()]} fullWidth sx={{ mb: 2 }} />
    </SimpleForm>
  </Create>
);