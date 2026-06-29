import {
  ReferenceManyField,
  useRecordContext,
  useListContext,
} from "react-admin";
import { Link } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { EmptySessions } from "../../sessions/SessionNotFound";

const formatTime = (dateStr: string) => {
  const d = new Date(dateStr);
  return d.toLocaleTimeString("en-US", { hour: "short", minute: "2-digit" });
};

const SessionItem = ({ session, eventId }: { session: any; eventId: string }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      py: 1.5,
      "&:not(:last-of-type)": { borderBottom: "1px solid", borderColor: "divider" },
    }}
  >
    <Box>
      <Typography sx={{ fontWeight: 500, fontSize: "0.88rem", color: "primary.main" }}>
        {session.title}
      </Typography>
      <Typography variant="caption" color="textSecondary" sx={{ fontSize: "0.75rem", mt: 0.2, display: "block" }}>
        {formatTime(session.startTime)}
        {session.room?.name && ` · ${session.room.name}`}
      </Typography>
    </Box>
    <Button
      component={Link}
      to={`/sessions/${session.id}?eventId=${eventId}`}
      size="small"
      startIcon={<EditIcon />}
      sx={{ fontSize: "0.75rem", flexShrink: 0 }}
      color="primary"
    >
      Edit
    </Button>
  </Box>
);

const SessionsTimeline = () => {
  const { data, isLoading } = useListContext();
  const event = useRecordContext();

  if (isLoading) return null;
  if (!data?.length) return <EmptySessions />;

  return (
    <Box>
      {data.map((session) => (
        <SessionItem key={session.id} session={session} eventId={event!.id} />
      ))}
    </Box>
  );
};

export const SessionsSection = () => {
  const event = useRecordContext();

  return (
    <Paper
      sx={{
        p: 2.5,
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }}>
          Sessions
        </Typography>
        {event && (
          <Button
            component={Link}
            to={`/sessions/create?eventId=${event.id}`}
            startIcon={<AddIcon />}
            variant="contained"
            color="primary"
            size="small"
            sx={{ borderRadius: "8px", fontWeight: 600, fontSize: "0.78rem" }}
          >
            Add
          </Button>
        )}
      </Box>

      <ReferenceManyField reference="sessions" target="eventId" label="">
        <SessionsTimeline />
      </ReferenceManyField>
    </Paper>
  );
};
