import { Menu, useLogout } from "react-admin";
import { Box } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import ScheduleIcon from "@mui/icons-material/Schedule";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import LogoutIcon from "@mui/icons-material/Logout";
import { LocationCity } from "@mui/icons-material";

export const RaMenu = () => {
  const logout = useLogout();

  return (
    <Menu sx={{ height: "100%", bgcolor: "background.paper", borderRight: "1px solid", borderColor: "divider"}}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ flex: 1 }}>
          <Menu.Item
            to="/events"
            primaryText="Event"
            leftIcon={<EventIcon />}
          />
          <Menu.Item
            to="/speakers"
            primaryText="Speaker"
            leftIcon={<PersonIcon />}
          />
          <Menu.Item
            to="/sessions"
            primaryText="Sessions"
            leftIcon={<ScheduleIcon />}
          />
          <Menu.Item
            to="/rooms"
            primaryText="Rooms"
            leftIcon={<MeetingRoomIcon />}
          />
          <Menu.Item
            to="/locations"
            primaryText="Locations"
            leftIcon={< LocationCity/>}
          />
        </Box>
        <Menu.Item
          to=""
          onClick={() => logout()}
          primaryText="Log out"
          leftIcon={<LogoutIcon />}
        />
      </Box>
    </Menu>
  );
};
