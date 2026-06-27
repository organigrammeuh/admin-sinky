import { Create, required, SimpleForm, TextInput } from "react-admin";

export const RoomCreate = () => (
  <Create redirect="show">
    <SimpleForm>
      <TextInput source="name" validate={[required()]} />
    </SimpleForm>
  </Create>
);
