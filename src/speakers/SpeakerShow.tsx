import { Show, SimpleShowLayout, TextField } from "react-admin";

export const SpeakerShow = () =>(
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="fullName" />
            <TextField source="bio" />
            <TextField source="profilePicture" />
            <TextField source="socialLinks" />
            <TextField source="sessions" />
        </SimpleShowLayout>
    </Show>
)