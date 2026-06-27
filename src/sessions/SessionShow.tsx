import {
  ArrayField,
  Datagrid,
  DateField,
  Show,
  SimpleShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";

const BackToEventButton = () => {
  const session = useRecordContext();
  const eventId = session?.event?.id;
  if (!eventId) return null;
  return (
    <Button
      component={Link}
      to={`/events/${eventId}/show`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to Event
    </Button>
  );
};

export const SessionShow = () => (
  <Show>
    <SimpleShowLayout>
      <BackToEventButton />
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startTime" />
      <DateField source="endTime" />
      <ArrayField source="speakers">
        <Datagrid
          bulkActionButtons={false}
          rowClick={(id) => `/speakers/${id}/show`}
        >
          <TextField source="fullName" />
          <TextField source="bio" />
        </Datagrid>
      </ArrayField>
      {/* <TextField source="eventId" /> */}
    </SimpleShowLayout>
  </Show>
);
