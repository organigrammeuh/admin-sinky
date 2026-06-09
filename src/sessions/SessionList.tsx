import { List, DataTable } from "react-admin";

export const SessionList = () => (
    <List>
        <DataTable rowClick="show">
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            {/* <DataTable.Col source="description" /> */}
            <DataTable.Col source="startTime" />
            <DataTable.Col source="endTime" />
            <DataTable.Col source="eventId" />
        </DataTable>
    </List>
);