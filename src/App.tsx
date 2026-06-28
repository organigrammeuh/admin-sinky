import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { EventList } from "./events/EventList";
import { EventShow } from "./events/EventShow";
import { EventCreate } from "./events/EventCreate";
import { EventEdit } from "./events/EventEdit";
import { SpeakerList } from "./speakers/SpeakerList";
import { SpeakerShow } from "./speakers/SpeakerShow";
import { SpeakerCreate } from "./speakers/SpeakerCreate";
import { SpeakerEdit } from "./speakers/SpeakerEdit";
import { SessionCreate } from "./sessions/SessionCreate";
import { SessionShow } from "./sessions/SessionShow";
import { SessionEdit } from "./sessions/SessionEdit";
import { RoomList } from "./rooms/RoomList";
import { RoomShow } from "./rooms/RoomShow";
import { RoomCreate } from "./rooms/RoomCreate";
import { RoomEdit } from "./rooms/RoomEdit";
import { darkTheme, lightTheme } from "./theme/theme";
import authProvider from "./authProvider";
import { LoginPage } from "./LoginPage";

export const App = () => (
  <Admin
    theme={lightTheme} 
    darkTheme={darkTheme}
    layout={Layout}
    authProvider={authProvider}
    dataProvider={dataProvider}
    loginPage={LoginPage}
  >
    <Resource
      name="events"
      create={EventCreate}
      edit={EventEdit}
      list={EventList}
      show={EventShow}
    />
    <Resource
      name="speakers"
      create={SpeakerCreate}
      list={SpeakerList}
      show={SpeakerShow}
      edit={SpeakerEdit}
    />
    <Resource
      name="sessions"
      create={SessionCreate}
      show={SessionShow}
      edit={SessionEdit}
    />
    <Resource
      name="rooms"
      create={RoomCreate}
      edit={RoomEdit}
      list={RoomList}
      show={RoomShow}
    />
  </Admin>
);
