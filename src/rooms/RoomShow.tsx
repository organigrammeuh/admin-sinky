import { Show, SimpleShowLayout, TextField } from "react-admin";

export const RoomShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="name" />
    </SimpleShowLayout>
  </Show>
);
