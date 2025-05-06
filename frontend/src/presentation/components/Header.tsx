import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../business/store/authStore";
import { useThemeStore } from "../../business/store/themeStore";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

export const Header: React.FC = () => {
  const { token, logout, user } = useAuthStore();
  const { mode, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            flexWrap: { xs: "wrap", sm: "nowrap" },
            justifyContent: "space-between",
            gap: { xs: 1, sm: 2 },
            py: { xs: 1, sm: 0 },
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: { sm: 1 },
              textDecoration: "none",
              color: "inherit",
              fontSize: { xs: "1rem", sm: "1.25rem" },
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            CRM App
          </Typography>
          {token && user && (
            <Typography
              variant="body1"
              sx={{
                color: "inherit",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                mr: { xs: 0, sm: 2 },
                textAlign: { xs: "center", sm: "left" },
              }}
            >
              Welcome, {user.email}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: 1, sm: 2 },
              flexWrap: { xs: "wrap", sm: "nowrap" },
            }}
          >
            <IconButton onClick={toggleTheme} color="inherit">
              {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            {token ? (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/projects"
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                >
                  Projects
                </Button>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/login"
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/register"
                  sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
