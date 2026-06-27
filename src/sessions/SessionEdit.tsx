import {
  DateTimeInput,
  Edit,
  minValue,
  NumberInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { useSearchParams } from "react-router-dom";

export const SessionEdit = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId");

  return (
    <Edit
      transform={(data) => ({ ...data, eventId })}
      redirect={eventId ? `/events/${eventId}/show` : false}
    >
      <SimpleForm>
        <TextInput source="title" validate={[required()]} />
        <TextInput source="description" validate={[required()]} />
        <DateTimeInput source="startTime" validate={[required()]} />
        <DateTimeInput source="endTime" validate={[required()]} />
        <ReferenceInput source="roomId" reference="rooms">
          <SelectInput optionText="name" validate={[required()]} label="Room" />
        </ReferenceInput>
        <NumberInput source="capacity" validate={[required(), minValue(1)]} />
        <ReferenceArrayInput source="speakerIds" reference="speakers">
          <SelectArrayInput optionText="fullName" label="Speakers" />
        </ReferenceArrayInput>
      </SimpleForm>
    </Edit>
  );
};
