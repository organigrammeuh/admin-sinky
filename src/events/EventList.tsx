import {
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  EditButton,
  List,
  TextInput,
  TextField,
  useRecordContext,
} from "react-admin";
import { Chip } from "@mui/material";

const eventFilters = [
  <TextInput source="title" label="Search by title" alwaysOn />,
  <TextInput source="location" label="Search by location" alwaysOn />,
  <DateInput source="start_date" label="After" alwaysOn />,
  <DateInput
    alwaysOn
    source="end_date"
    label="Before"
    validate={(value, allValues) =>
      value &&
      allValues?.startDate_gte &&
      new Date(value) < new Date(allValues.startDate_gte)
        ? "Before date must not be earlier than After date"
        : undefined
    }
  />,
];

const StatusChip = () => {
  const record = useRecordContext();
  if (!record) return null;

  const now = new Date();
  const start = new Date(record.startDate);
  const end = new Date(record.endDate);

  let label: string;
  let color: "default" | "primary" | "success" | "error";

  if (end < now) { label = "Passed"; color = "default"; }
  else if (start <= now) { label = "Ongoing"; color = "success"; }
  else { label = "Upcoming"; color = "primary"; }

  return (
    <Chip
      label={label}
      size="small"
      color={color}
      variant="outlined"
      sx={{ fontWeight: 600, minWidth: 74, fontSize: "0.72rem" }}
    />
  );
};

export const EventList = () => (
  <List filters={eventFilters}>
    <Datagrid
      rowClick="show"
      bulkActionButtons={false}
      sx={{
        "& .MuiTableHead-root .MuiTableCell-root": {
          fontWeight: 700,
          textTransform: "uppercase",
          fontSize: "0.72rem",
          letterSpacing: "0.05em",
          color: "text.secondary",
        },
      }}
    >
      <TextField source="title" label="Event" sx={{ fontWeight: 600 }} />
      <StatusChip label="Status" />
      <DateField source="startDate" label="Start" locales="en-US" />
      <DateField source="endDate" label="End" locales="en-US" />
      <TextField source="location" label="Location" />
      <EditButton color="primary" />
      <DeleteButton color="error" />
    </Datagrid>
  </List>
);
