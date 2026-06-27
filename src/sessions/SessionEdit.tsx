import {
  DateTimeInput,
  Edit,
  minValue,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";

export const SessionEdit = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Edit
      transform={(data) => ({ ...data, eventId })}
      redirect={eventId ? `/events/${eventId}/show` : false}
    >
      <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
        <Typography variant="h5" className="text-gradient" sx={{ fontWeight: "bold", mb: 3 }}>
          Modifier la Session
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
    </Edit>
  );
};