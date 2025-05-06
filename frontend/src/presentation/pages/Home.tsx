import React from "react";
import { WelcomeMessage } from "../components/WelcomeMessage";
import { AuthActions } from "../components/AuthActions";
import Box from "@mui/material/Box";

export const Home: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 2, textAlign: "center" }}>
      <WelcomeMessage />
      <AuthActions />
    </Box>
  );
};
