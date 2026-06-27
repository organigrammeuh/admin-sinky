import { ArrayInput, Create, ImageField, ImageInput, SimpleForm, SimpleFormIterator, TextInput, required } from "react-admin";

export const SpeakerCreate = () =>(
    <Create>
        <SimpleForm>
      <TextInput source="fullName" validate={[required()]} />
                  <TextInput source="bio" validate={[required()]} multiline />
                  <ImageInput
                      source="profilePicture"
                      label="Photo de profil"
                      accept={{ "image/*": [] }}
                      validate={[required()]}
                  >
                      <ImageField source="src" title="title" />
                  </ImageInput>
                  <ArrayInput source="socialLinks">
                      <SimpleFormIterator>
                          <TextInput label="URL"/>
                      </SimpleFormIterator>
                  </ArrayInput>
        </SimpleForm>
    </Create>
) 
