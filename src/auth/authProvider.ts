import Cookies from "js-cookie";
import { queryClient } from "../queryClient";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const authProvider = {
  login: async ({ email, password }: { email: string; password: string }) => {
    const body = JSON.stringify({ email: email.trim(), password });
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const { accessToken, refreshToken, user } = await response.json();

    Cookies.set("auth_token", accessToken, {
      expires: 1,
      secure: true,
      path: "/",
    });
    Cookies.set("user", JSON.stringify(user), { expires: 1, path: "/" });
    if (refreshToken) {
      Cookies.set("refresh_token", refreshToken, {
        expires: 7,
        secure: true,
        path: "/",
      });
    }
  },

  register: async ({
    fullName,
    email,
    password,
  }: {
    fullName: string;
    email: string;
    password: string;
  }) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });
    if (!res.ok) throw new Error("Registration failed");
    return res.json();
  },

  logout: async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // On supprime les cookies quoi qu'il arrive
    }
    Cookies.remove("auth_token", { path: "/" });
    Cookies.remove("user", { path: "/" });
    Cookies.remove("refresh_token", { path: "/" });
    queryClient.clear();
  },

  checkAuth: () => {
    const token = Cookies.get("auth_token");
    return token
      ? Promise.resolve()
      : Promise.reject({ message: "Login required" });
  },

  checkError: async ({ status }: { status: number }) => {
    if (status !== 401 && status !== 403) return;

    try {
      const refreshToken = Cookies.get("refresh_token");
      const res = await fetch(`${API_URL}/auth/refresh`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) throw new Error("Refresh failed");

      const { accessToken, refreshToken: newRefreshToken } = await res.json();
      Cookies.set("auth_token", accessToken, {
        expires: 1,
        secure: true,
        path: "/",
      });
      if (newRefreshToken) {
        Cookies.set("refresh_token", newRefreshToken, {
          expires: 7,
          secure: true,
          path: "/",
        });
      }
      return;
    } catch {
      Cookies.remove("auth_token", { path: "/" });
      Cookies.remove("user", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      queryClient.clear();
      throw new Error("Session expired");
    }
  },

  getIdentity: () => {
    try {
      const user = JSON.parse(Cookies.get("user") || "{}");
      return Promise.resolve({
        id: user.id,
        fullName: user.name,
        avatar: user.avatar_url,
      });
    } catch {
      return Promise.reject();
    }
  },

  getPermissions: () => {
    try {
      const user = JSON.parse(Cookies.get("user") || "{}");
      return Promise.resolve(user.role); // e.g. 'admin', 'editor', 'viewer'
    } catch {
      return Promise.reject();
    }
  },
};

export default authProvider;
