import { ReferenceManyField, Datagrid, Show, SimpleShowLayout, TextField } from "react-admin";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
      <ReferenceManyField reference="sessions" target="roomId" label="Sessions">
        <Datagrid bulkActionButtons={false} rowClick={(id) => `/sessions/${id}/show`}>
          <TextField source="title" />
        </Datagrid>
      </ReferenceManyField>
    </SimpleShowLayout>
  </Show>
);
