import { DataTable, DeleteButton, Edit, EditButton, List, TextInput } from "react-admin"

const speakerFilters = [
    <TextInput source="full_name" label="Search by full name" alwaysOn />,
];

export const SpeakerList = () => (
    <List filters={speakerFilters}>
        <DataTable rowClick="show">
            <DataTable.Col source="id" />
            <DataTable.Col source="fullName" />
            <DataTable.Col source="socialLinks" />
            <EditButton />
            <DeleteButton />
        </DataTable>
    </List>
)

