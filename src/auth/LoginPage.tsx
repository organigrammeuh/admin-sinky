import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch {
      notify("Invalid credentials", { type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300 }}
      >
        <Typography variant="h6" textAlign="center">
          Sign in
        </Typography>

        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size="small"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Sign in"}
        </Button>

        <Divider sx={{ my: 1 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            (window.location.href = `${API_URL}/auth/google/redirect`)
          }
        >
          Sign in with Google
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() =>
            (window.location.href = `${API_URL}/auth/github/redirect`)
          }
        >
          Sign in with GitHub
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ cursor: "pointer", color: "primary.main", mt: 1 }}
          onClick={() => navigate("/login?mode=register")}
        >
          Don't have an account? Sign up
        </Typography>
      </Box>
      <Notification />
    </Box>
  );
};
