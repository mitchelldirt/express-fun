import { Request, Response } from "express";
import { NewUser, User } from "../services/db";
import { insertUser, selectAllUsers } from "../models/user";
import { z } from "zod";

async function getAllUsers(req: Request, res: Response) {
  const users: User[] = await selectAllUsers();
  res.send(users);
}

async function createUser(req: Request, res: Response) {
  if (req.body) {
    const user: NewUser = {
      firstName: z.string().parse(req.body.firstName),
      lastName: z.string().parse(req.body.lastName),
      email: z.string().email().parse(req.body.email),
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    };

    const newUser = await insertUser(user);

    res.send("User created: " + newUser);
  }
}

export default {
  getAllUsers,
  createUser,
};
