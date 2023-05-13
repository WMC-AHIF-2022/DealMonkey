import express from "express";
import { StatusCodes } from "http-status-codes";
import { Habit } from "../data/interfaces/habit";
import {
  addHabit,
  getAllHabits,
  deleteTable,
  deleteHabit,
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

habitRouter.delete("/:id", async (request, response) => {
  const id = parseInt(request.params.id);

  try {
    deleteHabit(id);
    response.status(StatusCodes.GONE).json({ message: "ok" });
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

  const habit: Habit = {
    id,
    title,
    frequency,
    reminder,
    category,
    color,
    userId,
  };

  try {
    console.log(habit);
    updateHabit(habit);
    response.status(StatusCodes.ACCEPTED).json(habit);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});
