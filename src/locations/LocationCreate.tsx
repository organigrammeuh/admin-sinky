import { Create, required, SimpleForm, TextInput } from "react-admin";
import { Typography } from "@mui/material";

export const LocationCreate = () => (
  <Create redirect="show">
    <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
      <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
        Create a location
      </Typography>
      <TextInput source="name" fullWidth sx={{ mb: 2 }} />
      <TextInput source="country" validate={[required()]} fullWidth sx={{ mb: 2 }} />
      <TextInput source="city" validate={[required()]} fullWidth sx={{ mb: 2 }} />
    </SimpleForm>
  </Create>
);
