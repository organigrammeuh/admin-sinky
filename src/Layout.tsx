import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate } from "react-admin";
import { MyAppBar } from "./MyAppBar";
import { RaMenu } from "./RaMenu";
import { SyncTailwindDarkMode } from "./ui/SyncTailwindDarkMode";

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <SyncTailwindDarkMode />
    <RALayout appBar={MyAppBar} menu={RaMenu}>
      {children}
      <CheckForApplicationUpdate />
    </RALayout>
  </>
);
