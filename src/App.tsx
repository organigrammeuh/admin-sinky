import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { EventList } from "./events/EventList";
import { EventShow } from "./events/EventShow";
import { EventCreate } from "./events/EventCreate";
import { EventEdit } from "./events/EventEdit";
import { SpeakerList } from "./speakers/SpeakerList";
import { SpeakerShow } from "./speakers/SpeakerShow";
import { SpeakerEdit } from "./speakers/SpeakerEdit";
import { SpeakerCreate } from "./speakers/SpeakerCreate";
import { SessionCreate } from "./sessions/SessionCreate";
import { SessionList } from "./sessions/SessionList";
import { SessionShow } from "./sessions/SessionShow";
import { SessionEdit } from "./sessions/SessionEdit";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
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
    // create={SessionCreate}
    list={SessionList}
    show={SessionShow}
    // edit={SessionEdit}
     />
  </Admin>
);
