import express, { response } from "express";
import { StatusCodes } from "http-status-codes";
import { Avatar } from "../data/interfaces/model";
import { getAllAvatars } from "../data/repositories/avatar-repository";

export const avatarRouter = express.Router();

avatarRouter.get("/", async (request, response) => {
  const avatars = await getAllAvatars();
  response.status(StatusCodes.OK).json(avatars);
});
