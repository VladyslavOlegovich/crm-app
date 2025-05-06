/* eslint-disable @typescript-eslint/no-unused-vars */

import axios from "./index";

export interface AuthResponse {
  token: string;
  user: { _id: string; email: string };
}

export const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      "Login failed. Please check your credentials and try again."
    );
  }
};

export const register = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>("/auth/register", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};
