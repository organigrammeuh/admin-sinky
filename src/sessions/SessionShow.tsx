import { ArrayField, Datagrid, DateField, Show, SimpleShowLayout, TextField } from "react-admin";
import { Navigate } from "react-router";

export const SessionShow = () => (
    <Show>
        <SimpleShowLayout>

            <TextField source="id" />
            <TextField source="title" />
            <TextField source="description" />
            <DateField source="startTime" />
            <DateField source="endTime" />
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
        </SimpleShowLayout>
    </Show>
);