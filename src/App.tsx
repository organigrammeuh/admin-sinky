import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { EventList } from "./events/EventList";
import { EventShow } from "./events/EventShow";
import { EventCreate } from "./events/EventCreate";
import { EventEdit } from "./events/EventEdit";
import { SpeakerList } from "./speakers/SpeakerList";

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
      list={SpeakerList}
    />
  </Admin>
);
