import {
  Create,
  DateInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const EventCreate = () => {
  return (
    <Create redirect="show">
      <SimpleForm
        sx={{
          maxWidth: 680,
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
            New event
          </Typography>

          <TextInput source="title" validate={[required()]} fullWidth placeholder="Event title" sx={{ mb: 2.5 }} />
          <TextInput
            source="description"
            validate={[required()]}
            multiline
            rows={4}
            fullWidth
            placeholder="Describe your event..."
            sx={{ mb: 3 }}
          />

          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              color: "primary.main",
              display: "block",
              mb: 1.5,
              fontSize: "0.7rem",
            }}
          >
            When & where
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
            <DateInput source="startDate" validate={[required()]} fullWidth sx={{ flex: 1 }} />
            <DateInput source="endDate" validate={[required()]} fullWidth sx={{ flex: 1 }} />
          </Box>

          <TextInput source="location" validate={[required()]} fullWidth placeholder="Event location" sx={{ mb: 1 }} />
        </Box>
      </SimpleForm>
    </Create>
  );
};
