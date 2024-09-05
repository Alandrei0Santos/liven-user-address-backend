import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserDataRequest } from "../interfaces/user-data.request.interface";
import { DecodedToken } from "../interfaces/request/decoded-token.interface";

const authMiddleware = (
  req: UserDataRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  try {
    const decoded = jwt.verify(token, "secret") as DecodedToken;

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export default authMiddleware;
