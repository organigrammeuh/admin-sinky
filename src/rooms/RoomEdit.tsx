import { Edit, required, SimpleForm, TextInput } from "react-admin";

export const RoomEdit = () => (
  <Edit redirect="show">
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </Edit>
);
