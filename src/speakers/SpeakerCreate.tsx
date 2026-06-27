import {
  ArrayInput,
  Create,
  ImageField,
  ImageInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const SpeakerCreate = () => (
  <Create>
    <SimpleForm sx={{ maxWidth: 600, p: 4 }}>
      <Typography variant="h5" className="text-gradient" color="primary" sx={{ fontWeight: "bold", mb: 3 }}>
        Créer un Speaker
      </Typography>

      <TextInput source="fullName" validate={[required()]} fullWidth sx={{ mb: 2 }} />
      <TextInput source="bio" validate={[required()]} multiline rows={4} fullWidth sx={{ mb: 2 }} />
      
      <Box sx={{ 
        width: "100%", 
        border: "2px dashed rgba(168, 85, 247, 0.4)", 
        borderRadius: "12px", 
        p: 2, 
        mb: 3,
        backgroundColor: "rgba(168, 85, 247, 0.02)",
        "&:hover": { borderColor: "#a855f7" }
      }}>
        <ImageInput
          source="profilePicture"
          label="Photo de profil"
          accept={{ "image/*": [] }}
          validate={[required()]}
        >
          <ImageField source="src" title="title" sx={{ "& img": { borderRadius: "8px", maxHeight: 150 } }} />
        </ImageInput>
      </Box>

      <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1, fontWeight: "bold" }}>
        Liens de réseaux sociaux
      </Typography>
      <ArrayInput source="socialLinks">
        <SimpleFormIterator sx={{ gap: 1 }}>
          <TextInput label="URL" source="" fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  </Create>
);
