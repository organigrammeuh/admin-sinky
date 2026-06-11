import { DateTimeInput, Edit, minValue, NumberInput, ReferenceArrayInput, required, SelectArrayInput, SimpleForm, TextInput } from "react-admin";

export const SessionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="title" validate={[required()]} />
            <TextInput source="description" validate={[required()]} />
            <DateTimeInput source="startTime" validate={[required()]} />
            <DateTimeInput source="endTime" validate={[required()]} />
            <TextInput source="room" validate={[required()]} />
            <NumberInput source="capacity" validate={[required(), minValue(1)]} />
            <ReferenceArrayInput source="speakers" reference="speakers">
                <SelectArrayInput optionText="fullName" label="Speakers"/>
            </ReferenceArrayInput>
        </SimpleForm>
    </Edit>
)