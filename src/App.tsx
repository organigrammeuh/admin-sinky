import { useEffect, type ReactNode } from "react";
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
import authProvider from "./auth/authProvider";
import { AuthPage } from "./auth/AuthPage";
import Cookies from "js-cookie";

const OAuthHandler = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get("accessToken");
    const userParam = params.get("user");

    if (accessToken) {
      Cookies.set("auth_token", accessToken, { expires: 1 });
      if (userParam) {
        try {
          Cookies.set("user", userParam, { expires: 1 });
        } catch {
          // ignore
        }
      }
      window.location.href = "/";
    }
  }, []);

  return <>{children}</>;
};

export const App = () => (
  <OAuthHandler>
    <Admin
      theme={lightTheme}
      darkTheme={darkTheme}
      layout={Layout}
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={AuthPage}
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
  </OAuthHandler>
);
