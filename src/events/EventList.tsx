import {
  DataTable,
  DateField,
  DateInput,
  DeleteButton,
  EditButton,
  List,
  TextInput,
} from "react-admin";

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

export const EventList = () => (
  <List filters={eventFilters}>
    <DataTable rowClick={"show"}>
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      <DataTable.Col source="startDate">
        <DateField source="startDate" locales="en-US" />
      </DataTable.Col>
      <DataTable.Col source="endDate">
        <DateField source="endDate" locales="en-US" />
      </DataTable.Col>
      <DataTable.Col source="location" />
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
