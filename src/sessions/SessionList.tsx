import {
  List,
  DataTable,
  ReferenceInput,
  SelectInput,
  TextInput,
  DateTimeInput,
} from "react-admin";

const sessionFilters = [
  <TextInput source="title" label="Search by title" alwaysOn />,
  <ReferenceInput source="event_id" reference="events" perPage={100} alwaysOn>
    <SelectInput optionText="title" />
  </ReferenceInput>,
  <DateTimeInput source="start_date" label="Start after" alwaysOn />,
  <DateTimeInput source="e" label="End before" alwaysOn />,
];

export const SessionList = () => (
  <List filters={sessionFilters}>
    <DataTable rowClick="show">
      <DataTable.Col source="id" />
      <DataTable.Col source="title" />
      {/* <DataTable.Col source="description" /> */}
      <DataTable.Col source="startTime" />
      <DataTable.Col source="endTime" />
      <DataTable.Col source="event.title" />
    </DataTable>
  </List>
);
