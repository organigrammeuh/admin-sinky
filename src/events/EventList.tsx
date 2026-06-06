import { DataTable, DateField, List } from "react-admin"

export const EventList = () => (
    <List >
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="title" />
            <DataTable.Col source="startDate" >
                <DateField source="startDate" locales="en-US" />
            </DataTable.Col>
            <DataTable.Col source="endDate" >
                <DateField source="endDate" locales="en-US" />
            </DataTable.Col>
            <DataTable.Col source="location" />
        </DataTable>
    </List>
)