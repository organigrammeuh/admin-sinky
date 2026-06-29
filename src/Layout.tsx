import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { MyAppBar } from "./MyAppBar";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout appBar={MyAppBar}>
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
