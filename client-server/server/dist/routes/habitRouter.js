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
exports.habitRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const habit_repository_1 = require("../data/repositories/habit-repository");
exports.habitRouter = express_1.default.Router();
exports.habitRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(request.params.id);
    const habits = yield (0, habit_repository_1.getAllHabits)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(habits);
}));
exports.habitRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const title = request.body.title;
    const frequency = request.body.frequency;
    const reminder = request.body.reminder;
    const category = request.body.category;
    const color = request.body.color;
    const userId = parseInt(request.body.userId);
    //Todo: Validation
    const newTask = {
        id: -1,
        title: title,
        category: category,
        color: color,
        userId: userId,
    };
    try {
        const newHabit = yield (0, habit_repository_1.addHabit)(newTask, frequency, reminder);
        response.status(http_status_codes_1.StatusCodes.CREATED).json(newHabit);
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
exports.habitRouter.put("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(request.body.id);
    const title = request.body.title;
    const frequency = request.body.frequency;
    const reminder = request.body.reminder;
    const category = request.body.category;
    const color = request.body.color;
    const userId = parseInt(request.body.userId);
    const task = {
        id: id,
        title: title,
        category: category,
        color: color,
        userId: userId,
    };
    try {
        const updatedHabit = (0, habit_repository_1.updateHabit)(task, frequency, reminder);
        response.status(http_status_codes_1.StatusCodes.ACCEPTED).json(updatedHabit);
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
