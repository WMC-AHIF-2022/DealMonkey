import express from "express";
import { StatusCodes } from "http-status-codes";
import { Task, TaskQueue } from "../data/interfaces/model";
import {
  addTaskToQueue,
  getAllTasksFromQueue,
  updateTaskQueue,
  getAllTasksFromQueueCompleted,
} from "../data/repositories/taskQueue-repository";

export const taskQueueRouter = express.Router();

taskQueueRouter.get("/:id", async (request, response) => {
  const userId = Number.parseInt(request.params.id);
  const tasks: Task[] = await getAllTasksFromQueue(userId);
  response.status(StatusCodes.OK).json(tasks);
});

taskQueueRouter.get("/completed/:id", async (request, response) => {
  const userId = Number.parseInt(request.params.id);
  const taskQueue: TaskQueue[] = await getAllTasksFromQueueCompleted(userId);
  response.status(StatusCodes.OK).json(taskQueue);
});

taskQueueRouter.post("/", async (request, response) => {
  const taskId = parseInt(request.body.taskId);
  const userId: number = parseInt(request.body.userId);

  //Todo: Validation
  try {
    await addTaskToQueue(taskId, userId);
    response.status(StatusCodes.CREATED).json({ message: "ok" });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});

taskQueueRouter.put("/:taskId", async (request, response) => {
  const taskId = parseInt(request.params.taskId);
  const completed: number = parseInt(request.body.completed);

  try {
    await updateTaskQueue(taskId, completed);
    response.status(StatusCodes.CREATED).json({ message: "ok" });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});
