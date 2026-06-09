import { Delete } from "@mui/icons-material"
import { DataTable, DeleteButton, Edit, EditButton, List } from "react-admin"

export const SpeakerList = () => (
    <List>
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

