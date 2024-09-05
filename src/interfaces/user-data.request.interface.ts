import { Request } from "express";

export interface UserDataRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
  sessionData?: {
    isAuthenticated: boolean;
    role: string;
  };
}
