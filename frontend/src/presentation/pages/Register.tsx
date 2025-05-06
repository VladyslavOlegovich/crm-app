import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { useAuthStore } from "../../business/store/authStore";

export const Register: React.FC = () => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (email: string, password: string) => {
    await register(email, password);
    navigate("/projects");
  };

  return (
    <AuthForm
      title="Register"
      buttonText="Register"
      onSubmit={handleRegister}
    />
  );
};
