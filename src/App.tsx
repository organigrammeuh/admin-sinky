import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { EventList } from "./events/EventList";
import { EventShow } from "./events/EventShow";
import { EventCreate } from "./events/EventCreate";

export const App = () => (
  <Admin layout={Layout} dataProvider={dataProvider}>
    <Resource 
        name="events" 
        create={EventCreate}
        list={EventList}
        show={EventShow}
         />
  </Admin>
);
