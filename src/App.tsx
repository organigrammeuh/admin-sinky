import { type ReactNode } from "react";
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
import { queryClient } from "./queryClient";
import Cookies from "js-cookie";
import { MyAppBar } from "./MyAppBar";

const OAuthHandler = ({ children }: { children: ReactNode }) => {
  const params = new URLSearchParams(window.location.search);
  const accessToken = params.get("accessToken");

  if (accessToken) {
    const userParam = params.get("user");
    const refreshTokenParam = params.get("refreshToken");
    Cookies.remove("auth_token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    Cookies.set("auth_token", accessToken, {
      expires: 1,
      secure: true,
      path: "/",
    });
    if (userParam) {
      Cookies.set("user", userParam, { expires: 1, path: "/" });
    }
    if (refreshTokenParam) {
      Cookies.set("refresh_token", refreshTokenParam, {
        expires: 7,
        secure: true,
        path: "/",
      });
    }
    queryClient.clear();
    window.location.href = "/";
    return null;
  }

  return <>{children}</>;
};

export const App = () => (
  <OAuthHandler>
    <Admin
      queryClient={queryClient}
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
