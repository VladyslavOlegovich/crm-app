import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuthStore } from "../../business/store/authStore";

export const Login: React.FC = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    navigate("/projects");
  };

  return <AuthForm title="Login" buttonText="Login" onSubmit={handleLogin} />;
};
