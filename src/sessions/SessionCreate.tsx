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
import { Box, Typography } from "@mui/material";

export const SessionCreate = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Create
      transform={(data) => ({ ...data, eventId })}
      redirect={eventId ? `/events/${eventId}/show` : false}
    >
      <SimpleForm
        sx={{
          maxWidth: 600,
          "& .MuiPaper-root": {
            bgcolor: "background.paper",
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "12px",
          },
        }}
      >
        <Box sx={{ px: 3, pt: 3, pb: 1 }}>
          <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 3 }}>
            New session
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
        </Box>
      </SimpleForm>
    </Create>
  );
};