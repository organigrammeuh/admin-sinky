import { Show, SimpleShowLayout } from "react-admin";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { EventHero } from "./components/EventHero";
import { SessionsSection } from "./components/SessionsSection";

export const EventShow = () => (
  <Show sx={{ "& .RaShow-card": { background: "transparent", boxShadow: "none" } }}>
    <SimpleShowLayout>
      <Button
        component={Link}
        to="/events"
        startIcon={<ArrowBack />}
        variant="text"
        size="small"
        sx={{ color: "text.secondary", fontWeight: 500, mb: 1, fontSize: "0.8rem", "&:hover": { color: "primary.main" } }}
      >
        Back to events
      </Button>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%", mt: 0.5 }}>
        <EventHero />
        <SessionsSection />
      </Box>
    </SimpleShowLayout>
  </Show>
);