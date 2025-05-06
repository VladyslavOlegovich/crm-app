import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { useRepoStore } from "../../business/store/repoStore";
import { useAuthStore } from "../../business/store/authStore";
import { RepoTable } from "../components/RepoList";
import { RepoAddForm } from "../components/RepoAddForm";
import { ErrorMessage } from "../components/ErrorMessage";

export const Repositories: React.FC = () => {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  const { repos, fetchRepos, updateRepo, deleteRepo } = useRepoStore();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchRepos();
    }
  }, [token, navigate, fetchRepos]);

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Repositories
      </Typography>
      <RepoAddForm />
      <ErrorMessage />
      <RepoTable repos={repos} onUpdate={updateRepo} onDelete={deleteRepo} />
    </Box>
  );
};
