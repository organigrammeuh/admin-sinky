import { ArrayField, Datagrid, Show, TextField } from "react-admin";
import { Navigate } from "react-router";

export const SessionShow = () => (
    <Show>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="startTime" />
        <TextField source="endTime" />
        <ArrayField source="speakers">
            <Datagrid
                bulkActionButtons={false}
                rowClick={(id) => `/speakers/${id}/show`}
            >
                <TextField source="fullName" />
                <TextField source="bio" />
            </Datagrid>
        </ArrayField>
        {/* <TextField source="eventId" /> */}
    </Show>
);