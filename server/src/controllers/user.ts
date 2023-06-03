import { Request, Response } from "express";
import { NewUser, User, insertUserSchema } from "../services/db";
import { insertUser, selectAllUsers } from "../models/user";
import { z } from "zod";

async function getAllUsers(req: Request, res: Response) {
  const users: User[] = await selectAllUsers();
  res.send(users);
}

async function createUser(req: Request, res: Response) {
  if (req.body) {
    const user: NewUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
    };

    const validatedUser = insertUserSchema.safeParse(user);

    if (validatedUser.success === true) {
      try {
        const newUser = await insertUser(user);
        console.log(newUser);
        res.send("User created: their ID is " + newUser[0].insertedId);
      } catch (e) {
        res.status(400).send({ Error: "Duplicate email" });
      }
    } else {
      res.status(400).send(validatedUser.error);
    }
  }
}

export default {
  getAllUsers,
  createUser,
};
