import {
  Create,
  DateInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Typography } from "@mui/material";

export const EventCreate = () => {
  return (
    <Create redirect="show">
      <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
        <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
          Créer un Événement
        </Typography>
        <TextInput source="title" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <TextInput source="description" validate={[required()]} multiline rows={4} fullWidth sx={{ mb: 2 }} />
        <DateInput source="startDate" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <DateInput source="endDate" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <TextInput source="location" validate={[required()]} fullWidth sx={{ mb: 2 }} />
      </SimpleForm>
    </Create>
  );
};