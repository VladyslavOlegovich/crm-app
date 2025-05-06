import { create } from "zustand";
import { createTheme } from "@mui/material";

interface ThemeState {
  mode: "light" | "dark";
  theme: ReturnType<typeof createTheme>;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  mode: "light",
  theme: createTheme({
    palette: {
      mode: "light",
      background: {
        default: "#f5f5f5",
        paper: "#ffffff",
      },
      text: {
        primary: "#333333",
        secondary: "#555555",
      },
    },
  }),
  toggleTheme: () =>
    set((state) => {
      const newMode = state.mode === "light" ? "dark" : "light";
      return {
        mode: newMode,
        theme: createTheme({
          palette: {
            mode: newMode,
            background: {
              default: newMode === "light" ? "#f5f5f5" : "#121212",
              paper: newMode === "light" ? "#ffffff" : "#1e1e1e",
            },
            text: {
              primary: newMode === "light" ? "#333333" : "#ffffff",
              secondary: newMode === "light" ? "#555555" : "#bbbbbb",
            },
          },
        }),
      };
    }),
}));
