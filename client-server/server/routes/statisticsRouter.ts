import express from "express";
import { StatusCodes } from "http-status-codes";
import { Statistic } from "../data/interfaces/model";
import {
  getStatisticById,
  updateStatistic
} from "../data/repositories/statistics-repository";


require("dotenv").config();

const jwt = require("jsonwebtoken");

export const statisticsRounter = express.Router();

statisticsRounter.get("/:id", async (request, response) => {
  console.log("Get request for statistic")
  const id: number = Number(request.params.id);
  const statistic = await getStatisticById(id);
  if (statistic) {
    response.status(StatusCodes.OK).json(statistic);
  } else {
    response.sendStatus(StatusCodes.BAD_REQUEST);
  }
});

statisticsRounter.put("/", async (request, response) => {
  const userId = parseInt(request.body.userId);
  const currentStreak: number = request.body.currentStreak;
  const highestStreak: number = request.body.highestStreak;
  const pointsMultiplier: number = request.body.pointsMultiplier;

  const statistic: Statistic = {
    userId: userId,
    currentStreak: currentStreak,
    highestStreak: highestStreak,
    pointsMultiplier: pointsMultiplier
  };

  try {
    const statisticUpdate: Statistic = await updateStatistic(statistic);
    response.status(StatusCodes.ACCEPTED).json(statisticUpdate);
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});


// habitRouter.get("/:id", async (request, response) => {
//   const userId = parseInt(request.params.id);
//   const habits = await getAllHabits(userId);
//   response.status(StatusCodes.OK).json(habits);
// });