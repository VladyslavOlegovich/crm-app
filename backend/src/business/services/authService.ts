import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, IUser } from "../../data/models/user.model";

export interface AuthResponse {
  token: string;
  user: { _id: string; email: string };
}

const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return jwt.sign({ id: userId }, secret, { expiresIn: "1d" });
};

export const registerUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ email, password: hashedPassword });
  const token = generateToken(newUser._id.toString());
  return {
    token,
    user: { _id: newUser._id.toString(), email: newUser.email },
  };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }
  const token = generateToken(user._id.toString());
  return {
    token,
    user: { _id: user._id.toString(), email: user.email },
  };
};
