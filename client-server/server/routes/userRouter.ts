import express from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../data/interfaces/user";
import {
  addUser,
  getAllUsers,
  isAuthorized,
  getUserById,
} from "../data/repositories/user-repository";

export const userRouter = express.Router();

userRouter.get("/", async (request, response) => {
  const users = await getAllUsers();
  response.status(StatusCodes.OK).json(users);
});

userRouter.get("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const user = await getUserById(id);
  if (user) {
    response.sendStatus(StatusCodes.BAD_REQUEST);
  } else {
    response.status(StatusCodes.OK).json(user);
  }
});

userRouter.post("/registration", async (request, response) => {
  const username: string = request.body.username;
  const password: string = request.body.password;
  const email: string = request.body.email;
  const birthdate: string = request.body.birthdate;

  //improve validation
  if (password.trim().length === 0) {
    console.log("Trim error");
    response.sendStatus(StatusCodes.BAD_REQUEST);
    return;
  }

  const user: User = {
    id: -1,
    username: username,
    password: password,
    email: email,
    birthdate: new Date().toISOString(),
    points: 100,
    level: 1,
    registrationDate: new Date().toISOString(),
  };

  try {
    await addUser(user);
    response.sendStatus(StatusCodes.CREATED);
  } catch (exception) {
    response.sendStatus(StatusCodes.GONE);
  }
});

userRouter.post("/login", async (request, response) => {
  const username: string = request.body.username;
  const password: string = request.body.password;

  if (await isAuthorized(username, password)) {
    response.sendStatus(StatusCodes.OK);
  } else {
    response.sendStatus(StatusCodes.UNAUTHORIZED);
  }
});

//TODO
userRouter.delete("/:id", async (request, response) => {});

userRouter.delete("/", async (request, response) => {});