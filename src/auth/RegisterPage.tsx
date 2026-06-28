import { useState } from "react";
import { useNotify, Notification } from "react-admin";
import { Box, TextField, Button, CircularProgress, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authProvider } from "./authProvider";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const notify = useNotify();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      notify("Passwords do not match", { type: "error" });
      return;
    }
    setLoading(true);
    try {
      await authProvider.register({ fullName, email, password });
      notify("Account created! Please log in.", { type: "success" });
      navigate("/login");
    } catch {
      notify("Registration failed", { type: "error" });
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
          Create an account
        </Typography>

        <TextField
          label="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          size="small"
        />
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
        <TextField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          size="small"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Sign up"}
        </Button>

        <Divider sx={{ my: 1 }}>or</Divider>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => (window.location.href = `${API_URL}/auth/google/redirect`)}
        >
          Sign up with Google
        </Button>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => (window.location.href = `${API_URL}/auth/github/redirect`)}
        >
          Sign up with GitHub
        </Button>

        <Typography
          variant="body2"
          textAlign="center"
          sx={{ cursor: "pointer", color: "primary.main", mt: 1 }}
          onClick={() => navigate("/login")}
        >
          Already have an account? Sign in
        </Typography>
      </Box>
      <Notification />
    </Box>
  );
};
