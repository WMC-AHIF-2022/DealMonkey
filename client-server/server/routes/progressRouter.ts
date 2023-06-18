import express from "express";
import { StatusCodes } from "http-status-codes";

import { Progress } from "../data/interfaces/model";
import {
  getProgressByUserId,
  updateProgress,
} from "../data/repositories/progress-repository";

require("dotenv").config();

export const progressRouter = express.Router();

progressRouter.get("/:id", async (request, response) => {
  const id: number = Number(request.params.id);

  try {
    const progress: Progress = await getProgressByUserId(id);
    response.status(StatusCodes.ACCEPTED).json(progress);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});

progressRouter.put("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const points: number = Number(request.body.points);
  const experience: number = Number(request.body.experience);

  try {
    await updateProgress(id, points, experience);
    response.status(StatusCodes.ACCEPTED).json({ message: "progress updated" });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});
