import {
  DataTable,
  DeleteButton,
  EditButton,
  List,
  TextInput,
} from "react-admin";

const roomFilters = [
  <TextInput source="name" label="Search by name" alwaysOn />,
];

export const RoomList = () => (
  <List filters={roomFilters}>
    <DataTable rowClick="show">
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
