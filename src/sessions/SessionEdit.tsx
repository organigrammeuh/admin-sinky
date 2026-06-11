import { DateTimeInput, Edit, minValue, NumberInput, ReferenceArrayInput, ReferenceInput, required, SelectArrayInput, SelectInput, SimpleForm, TextInput } from "react-admin";

export const SessionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <TextInput source="description" validate={[required()]} />
            <DateTimeInput source="startTime" validate={[required()]} />
            <DateTimeInput source="endTime" validate={[required()]} />
            <ReferenceInput source="room" reference="rooms">
                <SelectInput optionText="name" validate={[required()]} label="Room"/>
            </ReferenceInput>
            <NumberInput source="capacity" validate={[required(), minValue(1)]} />
            <ReferenceArrayInput source="speakers" reference="speakers">
                <SelectArrayInput optionText="fullName" label="Speakers"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)