import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  AuthResponse,
} from "../../business/services/authService";

interface AuthRequestBody {
  email: string;
  password: string;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    const response = await registerUser(email, password);
    res.status(201).json(response);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as AuthRequestBody;
    const response = await loginUser(email, password);
    res.json(response);
  } catch (error: any) {
    const status =
      error.message === "User not found"
        ? 404
        : error.message === "Invalid credentials"
        ? 401
        : 500;
    res.status(status).json({ message: error.message });
  }
};
