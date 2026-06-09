import { Create, SimpleForm, TextInput, required } from "react-admin";

export const SpeakerCreate = () =>(
    <Create>
        <SimpleForm>
            <TextInput source="fullName" validate={[required()]} />
            <TextInput source="bio" validate={[required()]} />
            <TextInput source="profilePicture" validate={[required()]} />
            <TextInput source="socialLinks" />
        </SimpleForm>
    </Create>
)