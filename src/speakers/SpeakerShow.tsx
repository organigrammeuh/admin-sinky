import {
  ArrayField,
  Datagrid,
  FunctionField,
  Show,
  SimpleShowLayout,
  TextField,
} from "react-admin";

import { getImageSource } from "./SpeakerList";

export const SpeakerShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="fullName" />
      <TextField source="bio" />
      <FunctionField
        render={(record) =>
          record.profilePicture?.src ? (
            <img
              src={ getImageSource(record.profilePicture.src)}
              style={{ width: 200, height: 100, objectFit: "contain" }}
            />
          ) : null
        }
      />
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
);
