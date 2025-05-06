import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

interface AuthFormProps {
  title: string;
  buttonText: string;
  onSubmit: (email: string, password: string) => Promise<void>;
}

export const AuthForm: React.FC<AuthFormProps> = ({
  title,
  buttonText,
  onSubmit,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      await onSubmit(email, password);
    } catch (err: unknown) {
      console.log(err);
      setError("Operation failed. Please try again.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2 }}>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={!email || !password}
        fullWidth
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    </Box>
  );
};
