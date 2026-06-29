import { useSearchParams } from "react-router-dom";
import { LoginPage } from "./LoginPage";
import { RegisterPage } from "./RegisterPage";

export const AuthPage = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get("mode") === "register" ? (
    <RegisterPage />
  ) : (
    <LoginPage />
  );
};
