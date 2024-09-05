import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDataRequest } from "../interfaces/user-data.request.interface";

const prisma = new PrismaClient();

export const createUser = async (req: UserDataRequest, res: Response) => {
  const { email, password, name } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (!email || !password || !name) {
    return res
      .status(400)
      .json({ error: "All fields (email, password, name) are required." });
  }

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name },
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" });
  }
};

export const loginUser = async (req: UserDataRequest, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });
  res.json({ token });
};

export const getUser = async (req: UserDataRequest, res: Response) => {
  if (req.user) {
    const { userId } = req.user;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { addresses: true },
    });
    res.json(user);
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};

export const updateUser = async (req: UserDataRequest, res: Response) => {
  if (req.user) {
    const { userId } = req.user;
    const { name, email } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, email },
    });

    res.json(updatedUser);
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};

export const deleteUser = async (req: UserDataRequest, res: Response) => {
  if (req.user) {
    const { userId } = req.user;
    await prisma.user.delete({ where: { id: userId } });
    res.status(204).send();
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};
