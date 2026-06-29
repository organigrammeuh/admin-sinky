import {
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  EditButton,
  List,
  ReferenceField,
  TextInput,
  TextField,
} from "react-admin";

const eventFilters = [
  <TextInput source="title" label="Search by title" alwaysOn />,
  <TextInput source="idLocation" label="Search by location ID" alwaysOn />,
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

export const EventList = () => (
  <List filters={eventFilters} sx={{ "& .RaList-main": { marginTop: 2 } }}>
    <Datagrid 
      rowClick="show" 
      bulkActionButtons={false}
      sx={{
        "& .MuiTableRow-root:nth-of-type(odd)": {
          backgroundColor: (theme) => theme.palette.background.paper,
        },
        "& .MuiTableRow-root:nth-of-type(even)": {
          backgroundColor: (theme) => theme.palette.mode === "dark" ? "#0b0b14" : "#f9fafb",
        },
        "& .MuiTableRow-root:hover": {
          backgroundColor: (theme) => theme.palette.mode === "dark" ? "rgba(168, 85, 247, 0.08) !important" : "rgba(59, 130, 246, 0.04) !important",
        }
      }}
    >
      <TextField source="title" label="Title" sx={{ fontWeight: "bold", color: "primary.main" }} />
      <DateField source="startDate" label="Start Date" locales="en-US" />
      <DateField source="endDate" label="End Date" locales="en-US" />
      <ReferenceField source="idLocation" reference="locations" label="Location">
        <TextField source="name" />
      </ReferenceField>
      <EditButton color="primary" />
      <DeleteButton color="error" />
    </Datagrid>
  </List>
);