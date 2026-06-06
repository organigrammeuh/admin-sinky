import { DateField, Show, SimpleShowLayout, TextField } from "react-admin";

export const EventShow = () => {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <DateField source="startDate" />
        <DateField source="endDate" />
        <TextField source="location" />
      </SimpleShowLayout>
    </Show>
  );
};
