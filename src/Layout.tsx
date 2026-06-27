import type { ReactNode } from "react";
import { Layout as RALayout, CheckForApplicationUpdate, UserMenu, Logout } from "react-admin";

export const Layout = ({ children }: { children: ReactNode }) => (
  <RALayout
    userMenu={<UserMenu><Logout /></UserMenu>}
  >
    {children}
    <CheckForApplicationUpdate />
  </RALayout>
);
