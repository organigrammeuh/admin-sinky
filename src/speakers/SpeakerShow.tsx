import { ArrayField, Datagrid, Show, SimpleShowLayout, TextField } from "react-admin";

export const SpeakerShow = () =>(
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="fullName" />
            <TextField source="bio" />
            <TextField source="profilePicture" />
            <TextField source="socialLinks" />
            <ArrayField source="sessions">
                <Datagrid
                    bulkActionButtons={false}
                    rowClick={(id) => `/sessions/${id}/show`}
                >
                    <TextField source="title" />
                </Datagrid>
            </ArrayField>
        </SimpleShowLayout>
    </Show>
)