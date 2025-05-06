import { Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../business/store/authStore";

export const AuthActions: React.FC = () => {
  const { token } = useAuthStore();

  return token ? (
    <Button variant="contained" component={Link} to="/projects">
      Go to Projects
    </Button>
  ) : (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
      <Button variant="contained" component={Link} to="/login">
        Login
      </Button>
      <Button variant="outlined" component={Link} to="/register">
        Register
      </Button>
    </Box>
  );
};
