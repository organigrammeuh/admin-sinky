import { DataTable, List } from "react-admin"

export const EventList = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="startDate" />
            <DataTable.Col source="endDate" />
            <DataTable.Col source="location" />
        </DataTable>
    </List>
)