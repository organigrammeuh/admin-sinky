import { useRecordContext } from "react-admin";
import { Chip } from "@mui/material";

export const StatusBadge = () => {
  const record = useRecordContext();
  if (!record) return null;

  const now = new Date();
  const start = new Date(record.startDate);
  const end = new Date(record.endDate);

  let label: string;
  let color: "default" | "primary" | "success" | "error";

  if (end < now) { label = "Passed"; color = "default"; }
  else if (start <= now) { label = "Ongoing"; color = "success"; }
  else { label = "Upcoming"; color = "primary"; }

  return (
    <Chip
      label={label}
      color={color}
      variant="outlined"
      size="small"
      sx={{ fontWeight: 600, letterSpacing: "0.03em" }}
    />
  );
};
