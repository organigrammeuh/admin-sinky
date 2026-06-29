import { useEffect } from "react";
import { useTheme } from "react-admin";

export const SyncTailwindDarkMode = () => {
  const [theme] = useTheme();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return null;
};