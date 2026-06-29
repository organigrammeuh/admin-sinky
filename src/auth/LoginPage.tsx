import { useState } from "react";
import { useLogin, useNotify, Notification, useTheme } from "react-admin";
import {
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Divider,
  Paper,
  IconButton,
  useTheme as useMuiTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

const API_URL = import.meta.env.VITE_API_URL || "/api";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useLogin();
  const notify = useNotify();
  const navigate = useNavigate();
  const [theme, setTheme] = useTheme();

  // Accès direct à l'objet palette de MUI de l'application
  const muiTheme = useMuiTheme();
  const { palette } = muiTheme;

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

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: 'url("/hey.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        px: 2,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor:
            theme === "dark"
              ? "rgba(9, 9, 14, 0.45)" // Utilise la couleur de fond par défaut du darkTheme
              : "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(2px)",
          pointerEvents: "none",
          transition: "all 0.3s ease",
        }}
      />

      <Box sx={{ position: "absolute", top: 24, right: 24, zIndex: 20 }}>
        <IconButton
          onClick={toggleTheme}
          sx={{
            backgroundColor: palette.background.paper,
            border: "1px solid",
            borderColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
            color: palette.text.primary,
            p: 1.5,
            borderRadius: "14px",
            backdropFilter: "blur(8px)",
            boxShadow: theme === "dark" ? "0 4px 30px rgba(0, 0, 0, 0.4)" : "0 4px 20px rgba(0,0,0,0.08)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              borderColor: palette.primary.main,
              transform: "translateY(-1px)",
            },
          }}
        >
          {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
        </IconButton>
      </Box>

      <Paper
        elevation={0}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          maxWidth: 390,
          p: { xs: 4, sm: 5 },
          borderRadius: "28px",
          backgroundColor:
            theme === "dark"
              ? "rgba(19, 19, 34, 0.75)" // Transparence basée sur la couleur 'paper' du darkTheme
              : "rgba(255, 255, 255, 0.75)",
          backdropFilter: "blur(10px)",
          border: "1px solid",
          borderColor:
            theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.06)",
          position: "relative",
          zIndex: 10,
          boxShadow:
            theme === "dark"
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            component="img"
            src="/icon.png"
            alt="Logo"
            sx={{
              width: 52,
              height: 52,
              borderRadius: "14px",
              objectFit: "cover",
              boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
            }}
          />
          <Typography
            variant="h5"
            fontWeight={800}
            textAlign="center"
            sx={{
              color: palette.text.primary,
              letterSpacing: "-0.6px",
              fontFamily: "Syne, sans-serif",
              mt: 1.5,
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: palette.text.secondary,
              textAlign: "center",
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.875rem",
              opacity: 0.8,
            }}
          >
            Sign in to access your dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: palette.text.primary,
                borderRadius: "12px",
                fontFamily: "DM Sans, sans-serif",
                backgroundColor:
                  theme === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.5)",
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                },
                "&:hover fieldset": { borderColor: palette.text.secondary },
                "&.Mui-focused fieldset": {
                  borderColor: palette.primary.main,
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                color: palette.text.secondary,
                fontFamily: "DM Sans, sans-serif",
                "&.Mui-focused": { color: palette.primary.main },
              },
            }}
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                color: palette.text.primary,
                borderRadius: "12px",
                fontFamily: "DM Sans, sans-serif",
                backgroundColor:
                  theme === "dark"
                    ? "rgba(0,0,0,0.2)"
                    : "rgba(255,255,255,0.5)",
                "& fieldset": {
                  borderColor:
                    theme === "dark"
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.1)",
                },
                "&:hover fieldset": { borderColor: palette.text.secondary },
                "&.Mui-focused fieldset": {
                  borderColor: palette.primary.main,
                  borderWidth: "1.5px",
                },
              },
              "& .MuiInputLabel-root": {
                color: palette.text.secondary,
                fontFamily: "DM Sans, sans-serif",
                "&.Mui-focused": { color: palette.primary.main },
              },
            }}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: "12px",
            backgroundColor: palette.primary.main,
            color: palette.getContrastText?.(palette.primary.main) || "#ffffff",
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 600,
            fontSize: "0.95rem",
            fontFamily: "DM Sans, sans-serif",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: palette.primary.main,
              opacity: 0.95,
              transform: "translateY(-0.5px)",
            },
          }}
        >
          {loading ? (
            <CircularProgress
              size={20}
              sx={{ color: palette.getContrastText?.(palette.primary.main) || "#ffffff" }}
            />
          ) : (
            "Sign In"
          )}
        </Button>

        <Divider
          sx={{
            "&::before, &::after": {
              borderColor:
                theme === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.06)",
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: palette.text.secondary,
              px: 1.5,
              textTransform: "uppercase",
              fontWeight: 600,
              letterSpacing: "0.8px",
              fontSize: "0.75rem",
              opacity: 0.6,
              fontFamily: "DM Sans, sans-serif",
            }}
          >
            Or continue with
          </Typography>
        </Divider>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            fullWidth
            onClick={() =>
              (window.location.href = `${API_URL}/auth/google/redirect`)
            }
            startIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            }
            sx={{
              py: 1.2,
              borderRadius: "12px",
              borderColor:
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: palette.text.primary,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: palette.primary.main,
                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              },
            }}
          >
            Google
          </Button>

          <Button
            variant="outlined"
            fullWidth
            onClick={() =>
              (window.location.href = `${API_URL}/auth/github/redirect`)
            }
            startIcon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
            }
            sx={{
              py: 1.2,
              borderRadius: "12px",
              borderColor:
                theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
              color: palette.text.primary,
              textTransform: "none",
              fontWeight: 500,
              fontSize: "0.9rem",
              fontFamily: "DM Sans, sans-serif",
              transition: "all 0.2s ease",
              "&:hover": {
                borderColor: palette.primary.main,
                backgroundColor: theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
              },
            }}
          >
            GitHub
          </Button>
        </Box>

        <Typography
          variant="body2"
          textAlign="center"
          onClick={() => navigate("/login?mode=register")}
          sx={{
            cursor: "pointer",
            color: palette.primary.main,
            fontWeight: 600,
            fontSize: "0.85rem",
            fontFamily: "DM Sans, sans-serif",
            transition: "opacity 0.2s",
            "&:hover": { opacity: 0.8 },
          }}
        >
          Don't have an account? Sign up
        </Typography>
      </Paper>
      <Notification />
    </Box>
  );
};