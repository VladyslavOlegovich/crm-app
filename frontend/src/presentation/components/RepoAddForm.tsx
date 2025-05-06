import { Box, TextField, Button, CircularProgress } from "@mui/material";
import { useRepoStore } from "../../business/store/repoStore";

export const RepoAddForm: React.FC = () => {
  const { path, loading, setPath, addRepo } = useRepoStore();

  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        label="Repository Path (e.g., facebook/react)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        fullWidth
        margin="normal"
        disabled={loading}
      />
      <Button
        variant="contained"
        onClick={addRepo}
        disabled={!path || loading}
        sx={{ mt: 1 }}
      >
        {loading ? <CircularProgress size={24} /> : "Add Repository"}
      </Button>
    </Box>
  );
};
