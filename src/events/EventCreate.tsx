import {
  Create,
  DateInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";

export const EventCreate = () => {
  return (
    <Create redirect="show">
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <DateInput source="startDate" validate={[required()]} />
        <DateInput source="endDate" validate={[required()]} />
        <TextInput source="location" validate={[required()]} />
      </SimpleForm>
    </Create>
  );
};
