import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { UserDataRequest } from "../interfaces/user-data.request.interface";

const prisma = new PrismaClient();

export const createAddress = async (req: UserDataRequest, res: Response) => {
  const { street, city, country } = req.body;

  if (!street || !city || !country) {
    return res
      .status(400)
      .json({ error: "All fields (street, city, country) are required." });
  }

  if (req.user) {
    const { userId } = req.user;
    const address = await prisma.address.create({
      data: { street, city, country, userId },
    });
    res.status(201).json(address);
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};

export const getAddresses = async (req: UserDataRequest, res: Response) => {
  if (req.user) {
    const { userId } = req.user;
    const { country } = req.query;

    const addresses = await prisma.address.findMany({
      where: { userId, country: country as string },
    });
    res.json(addresses);
  } else {
    return res.status(401).json({ error: "User not authenticated" });
  }
};

export const updateAddress = async (req: UserDataRequest, res: Response) => {
  const { id } = req.params;
  const { street, city, country } = req.body;

  if (!street || !city || !country) {
    return res
      .status(400)
      .json({ error: "All fields (street, city, country) are required." });
  }

  const updatedAddress = await prisma.address.update({
    where: { id: Number(id) },
    data: { street, city, country },
  });
  res.json(updatedAddress);
};

export const deleteAddress = async (req: UserDataRequest, res: Response) => {
  const { id } = req.params;
  await prisma.address.delete({ where: { id: Number(id) } });
  res.status(204).send();
};
