import {
  Create,
  SimpleForm,
  TextInput,
  required,
  DateTimeInput,
  ReferenceInput,
  SelectInput,
  NumberInput,
  minValue,
  ReferenceArrayInput,
  SelectArrayInput,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

export const SessionCreate = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Create
      transform={(data) => ({ ...data, eventId })}
      redirect={eventId ? `/events/${eventId}/show` : false}
    >
      <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
        <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
          Créer une Session
        </Typography>
        <TextInput source="title" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <TextInput source="description" validate={[required()]} multiline rows={4} fullWidth sx={{ mb: 2 }} />
        <DateTimeInput source="startTime" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <DateTimeInput source="endTime" validate={[required()]} fullWidth sx={{ mb: 2 }} />
        <ReferenceInput source="roomId" reference="rooms">
          <SelectInput optionText="name" validate={[required()]} label="Room" fullWidth sx={{ mb: 2 }} />
        </ReferenceInput>
        <NumberInput source="capacity" validate={[required(), minValue(1)]} fullWidth sx={{ mb: 2 }} />
        <ReferenceArrayInput source="speakerIds" reference="speakers">
          <SelectArrayInput optionText="fullName" label="Speakers" fullWidth sx={{ mb: 2 }} />
        </ReferenceArrayInput>
      </SimpleForm>
    </Create>
  );
};