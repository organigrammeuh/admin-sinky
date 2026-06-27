import {
  DataTable,
  DeleteButton,
  EditButton,
  FunctionField,
  List,
  TextInput,
} from "react-admin";

const speakerFilters = [
  <TextInput source="full_name" label="Search by full name" alwaysOn />,
];

export const getImageSource = (url : string) => {
    return url.startsWith('http') ? url : 'http://localhost:3000/' + url;
}

export const SpeakerList = () => (
  <List filters={speakerFilters}>
    <DataTable rowClick="show">
      <DataTable.Col source="id" />
      <DataTable.Col source="fullName" />
      <DataTable.Col source="profilePicture">
        <FunctionField
          render={(record) =>
            record.profilePicture?.src ? (
              <img
                src={ getImageSource(record.profilePicture.src)}
                className="profile-picture"
              />
            ) : null
          }
        />
      </DataTable.Col>
      <DataTable.Col source="socialLinks" />
      <EditButton />
      <DeleteButton />
    </DataTable>
  </List>
);
