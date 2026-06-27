import { DateInput, Edit, required, SimpleForm, TextInput } from "react-admin";

export const EventEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} />
      <TextInput source="description" validate={[required()]} />
      <DateInput source="startDate" validate={[required()]} />
      <DateInput source="endDate" validate={[required()]} />
      <TextInput source="location" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
