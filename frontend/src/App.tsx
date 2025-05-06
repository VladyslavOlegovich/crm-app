import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./presentation/pages/Login";
import { Register } from "./presentation/pages/Register";
import { CssBaseline, ThemeProvider, Typography } from "@mui/material";
import { PrivateRoute } from "./presentation/routes/PrivateRoute";
import { Repositories } from "./presentation/pages/Repositories";
import { Header } from "./presentation/components/Header";
import { Home } from "./presentation/pages/Home";
import { useThemeStore } from "./business/store/themeStore";

const App: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Repositories />
              </PrivateRoute>
            }
          />
          <Route
            path="*"
            element={
              <Typography variant="h4" sx={{ m: 4 }} color="text.primary">
                404 - Page Not Found
              </Typography>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
