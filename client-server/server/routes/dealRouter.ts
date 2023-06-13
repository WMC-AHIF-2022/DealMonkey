import express, { response } from "express";
import { StatusCodes } from "http-status-codes";
import { Deal } from "../data/interfaces/model";
import {
  getAllDealsByUser,
  getDealByTaskId,
  addDeal,
} from "../data/repositories/deal-repository";

export const dealRouter = express.Router();

dealRouter.get("/:userId", async (request, response) => {
  const userId = Number.parseInt(request.params.userId);
  const deals = await getAllDealsByUser(userId);
  response.status(StatusCodes.OK).json(deals);
});

dealRouter.get("/task/:taskId", async (request, response) => {
  const taskId = Number.parseInt(request.params.taskId);
  const deal = await getDealByTaskId(taskId);
  response.status(StatusCodes.OK).json(deal);
});

dealRouter.post("/:taskId", async (request, response) => {
  const taskId = Number.parseInt(request.params.taskId);
  try {
    addDeal(taskId);
  } catch (err) {}
});
