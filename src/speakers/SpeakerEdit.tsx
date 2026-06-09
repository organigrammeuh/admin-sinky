import { Edit, SimpleForm, TextInput, required } from "react-admin";

export const SpeakerEdit = () =>(
    <Edit>
        <SimpleForm>
            <TextInput source="fullName" validate={[required()]} />
            <TextInput source="bio" validate={[required()]} />
            <TextInput source="profilePicture" validate={[required()]} />
            <TextInput source="socialLinks" />
        </SimpleForm>
    </Edit>
) 