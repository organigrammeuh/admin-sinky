import { Show, TextField } from "react-admin";

export const SessionShow = () => (
    <Show>
        <TextField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <TextField source="startTime" />
        <TextField source="endTime" />
        {/* <TextField source="eventId" /> */}
    </Show>
);