import { Edit, required, SimpleForm, TextInput } from "react-admin";
import { Box, Typography } from "@mui/material";

export const RoomEdit = () => (
  <Edit redirect="show">
    <SimpleForm
      sx={{
        maxWidth: 600,
        "& .MuiPaper-root": {
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          borderRadius: "12px",
        },
      }}
    >
      <Box sx={{ px: 3, pt: 3, pb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: "1.2rem", mb: 3 }}>
          Edit room
        </Typography>
        <TextInput source="name" validate={[required()]} fullWidth placeholder="Room name" sx={{ mb: 1 }} />
      </Box>
    </SimpleForm>
  </Edit>
);