import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  ReferenceManyField,
  Datagrid,
  FunctionField,
  useRecordContext,
  ShowButton,
  DeleteButton,
} from "react-admin";
import { Link } from "react-router-dom";
import { Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBack";

const CreateSessionButton = () => {
  const event = useRecordContext();
  return (
    <Button
      component={Link}
      to={`/sessions/create?eventId=${event?.id}`}
      startIcon={<AddIcon />}
      variant="contained"
      size="small"
      sx={{ mb: 2 }}
    >
      Add Session
    </Button>
  );
};

const BackToEventList = () => {
  return (
    <Button
      component={Link}
      to={`/events`}
      startIcon={<ArrowBack />}
      variant="outlined"
      size="small"
      sx={{ mb: 2 }}
    >
      Back to events list
    </Button>
  );
};

const SessionsSection = () => {
  const event = useRecordContext();
  return (
    <>
      <CreateSessionButton />
      
      <ReferenceManyField
        reference="sessions"
        target="eventId"
        label="Sessions"
      >
        <Datagrid bulkActionButtons={false} rowClick={false}>
          <TextField source="title" />
          <TextField source="room.name" label="Room" />
          <DateField source="startTime" showTime />
          <FunctionField
            render={(session: any) => (
              <Button
                component={Link}
                to={`/sessions/${session?.id}?eventId=${event?.id}`}
                size="small"
                startIcon={<EditIcon />}
              >
                Edit
              </Button>
            )}
          />
          <ShowButton />
          <DeleteButton redirect={`/events/${event!.id}/show`} />
        </Datagrid>
      </ReferenceManyField>
    </>
  );
};

export const EventShow = () => (
  <Show>
    <SimpleShowLayout>
    <BackToEventList />
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="startDate" />
      <DateField source="endDate" />
      <TextField source="location" />
      <SessionsSection />
    </SimpleShowLayout>
  </Show>
);
