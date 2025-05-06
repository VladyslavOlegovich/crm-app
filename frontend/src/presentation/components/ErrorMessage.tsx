import { Typography } from "@mui/material";
import { useRepoStore } from "../../business/store/repoStore";

export const ErrorMessage: React.FC = () => {
  const { error } = useRepoStore();

  if (!error) return null;

  return (
    <Typography color="error" sx={{ mb: 2 }}>
      {error}
    </Typography>
  );
};
