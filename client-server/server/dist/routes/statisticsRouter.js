"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.statisticsRounter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const statistics_repository_1 = require("../data/repositories/statistics-repository");
require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.statisticsRounter = express_1.default.Router();
exports.statisticsRounter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get request for statistic");
    const id = Number(request.params.id);
    const statistic = yield (0, statistics_repository_1.getStatisticById)(id);
    if (statistic) {
        response.status(http_status_codes_1.StatusCodes.OK).json(statistic);
    }
    else {
        response.sendStatus(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
}));
exports.statisticsRounter.put("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(request.body.userId);
    const currentStreak = request.body.currentStreak;
    const highestStreak = request.body.highestStreak;
    const pointsMultiplier = request.body.pointsMultiplier;
    const statistic = {
        userId: userId,
        currentStreak: currentStreak,
        highestStreak: highestStreak,
        pointsMultiplier: pointsMultiplier
    };
    try {
        const statisticUpdate = yield (0, statistics_repository_1.updateStatistic)(statistic);
        response.status(http_status_codes_1.StatusCodes.ACCEPTED).json(statisticUpdate);
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
// habitRouter.get("/:id", async (request, response) => {
//   const userId = parseInt(request.params.id);
//   const habits = await getAllHabits(userId);
//   response.status(StatusCodes.OK).json(habits);
// });
