import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { IRepository } from "../../data/types/repo";

interface RepoTableProps {
  repos: IRepository[];
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
}

export const RepoTable: React.FC<RepoTableProps> = ({
  repos,
  onUpdate,
  onDelete,
}) => {
  if (repos.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight={200}
      >
        <Typography variant="h6" color="text.secondary">
          There are no repositories at the moment. Add your first repo!
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {repos.map((repo) => (
        <Card key={repo._id} variant="outlined">
          <CardContent>
            <Typography variant="h6">{repo.name}</Typography>
            <Typography variant="body2">Owner: {repo.owner}</Typography>
            <Typography variant="body2">
              URL:{" "}
              <a href={repo.url} target="_blank" rel="noopener noreferrer">
                {repo.url}
              </a>
            </Typography>
            <Typography variant="body2">Stars: {repo.stars}</Typography>
            <Typography variant="body2">Forks: {repo.forks}</Typography>
            <Typography variant="body2">Issues: {repo.issues}</Typography>
            <Typography variant="body2">
              Created: {new Date(repo.createdAt * 1000).toLocaleDateString()}
            </Typography>
            <Box mt={2} display="flex" gap={1}>
              <Button
                onClick={() => onUpdate(repo._id)}
                variant="contained"
                size="small"
              >
                Update
              </Button>
              <Button
                onClick={() => onDelete(repo._id)}
                color="error"
                variant="outlined"
                size="small"
              >
                Delete
              </Button>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
