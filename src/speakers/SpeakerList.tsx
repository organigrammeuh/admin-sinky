import { DataTable, DeleteButton, Edit, EditButton, List, TextInput } from "react-admin"

const speakerFilters = [
    <TextInput source="full_name" label="Search by full name" alwaysOn />,
];

export const SpeakerList = () => (
    <List filters={speakerFilters}>
        <DataTable rowClick="show">
            <DataTable.Col source="id" />
            <DataTable.Col source="fullName" />
            {/* <DataTable.Col source="bio" /> */}
            {/* <DataTable.Col source="profilePicture" /> */}
            <DataTable.Col source="socialLinks" />
            <DataTable.Col source="sessions" />
            <EditButton />
            <DeleteButton />
        </DataTable>
    </List>
)

