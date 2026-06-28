import { useState } from "react";
import { useLogin, useNotify, Notification } from "react-admin";
import { Box, TextField, Button, CircularProgress } from "@mui/material";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
    } catch {
      notify("Identifiants invalides", { type: "error" });
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
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          size="small"
        />
        <TextField
          label="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          size="small"
        />
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Se connecter"}
        </Button>
      </Box>
      <Notification />
    </Box>
  );
};
