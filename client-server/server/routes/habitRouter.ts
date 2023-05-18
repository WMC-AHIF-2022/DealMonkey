import express from "express";
import { StatusCodes } from "http-status-codes";
import { Habit } from "../data/interfaces/habit";
import { Task } from "../data/interfaces/task";
import {
  addHabit,
  getAllHabits,
  updateHabit,
} from "../data/repositories/habit-repository";

export const habitRouter = express.Router();

habitRouter.get("/:id", async (request, response) => {
  const userId = parseInt(request.params.id);
  const habits = await getAllHabits(userId);
  response.status(StatusCodes.OK).json(habits);
});

habitRouter.post("/", async (request, response) => {
  const title: string = request.body.title;
  const frequency: string = request.body.frequency;
  const reminder: string = request.body.reminder;
  const category: string = request.body.category;
  const color: string = request.body.color;
  const userId: number = parseInt(request.body.userId);

  //Todo: Validation

  const newTask: Task = {
    id: -1,
    title: title,
    category: category,
    color: color,
    userId: userId,
  };

  try {
    const newHabit:Habit = await addHabit(newTask, frequency, reminder);
    response.status(StatusCodes.CREATED).json(newHabit);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});

habitRouter.put("/", async (request, response) => {
  const id = parseInt(request.body.id);
  const title: string = request.body.title;
  const frequency: string = request.body.frequency;
  const reminder: string = request.body.reminder;
  const category: string = request.body.category;
  const color: string = request.body.color;
  const userId: number = parseInt(request.body.userId);

  const task: Task = {
    id: id,
    title: title,
    category: category,
    color: color,
    userId: userId,
  };

  try {
    const updatedHabit:Habit = await updateHabit(task, frequency, reminder);
    response.status(StatusCodes.ACCEPTED).json(updatedHabit);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});