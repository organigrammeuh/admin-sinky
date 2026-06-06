import { Admin, Resource } from "react-admin";
import { Layout } from "./Layout";
import dataProvider from "./dataProvider";
import { EventList } from "./events/EventList";

export const App = () => <Admin layout={Layout} dataProvider={dataProvider} >
    <Resource name="events" list={EventList} />
</Admin>;
