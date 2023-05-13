import express from "express";
import { StatusCodes } from "http-status-codes";
import { Habit } from "../data/interfaces/habit";
import {
  addHabit,
  getAllHabits,
  deleteTable,
} from "../data/repositories/habit-repository";

export const habitRouter = express.Router();

habitRouter.get("/", async (request, response) => {
  const habits = await getAllHabits();
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

  const habit: Habit = {
    id: -1,
    title,
    frequency,
    reminder,
    category,
    color,
    userId,
  };

  try {
    addHabit(habit);
    response.status(StatusCodes.CREATED).json(habit);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});

habitRouter.delete("/", async (request, response) => {
  await deleteTable();
  response.sendStatus(StatusCodes.OK);
});
