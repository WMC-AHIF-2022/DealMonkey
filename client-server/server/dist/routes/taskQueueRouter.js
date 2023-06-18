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
exports.taskQueueRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const taskQueue_repository_1 = require("../data/repositories/taskQueue-repository");
exports.taskQueueRouter = express_1.default.Router();
exports.taskQueueRouter.get("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.parseInt(request.params.id);
    const tasks = yield (0, taskQueue_repository_1.getAllTasksFromQueue)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(tasks);
}));
exports.taskQueueRouter.get("/completed/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.parseInt(request.params.id);
    const taskQueue = yield (0, taskQueue_repository_1.getAllTasksFromQueueCompleted)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(taskQueue);
}));
exports.taskQueueRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(request.body.taskId);
    const userId = parseInt(request.body.userId);
    //Todo: Validation
    try {
        yield (0, taskQueue_repository_1.addTaskToQueue)(taskId, userId);
        response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "ok" });
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
exports.taskQueueRouter.put("/:taskId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = parseInt(request.params.taskId);
    const completed = parseInt(request.body.completed);
    try {
        yield (0, taskQueue_repository_1.updateTaskQueue)(taskId, completed);
        response.status(http_status_codes_1.StatusCodes.CREATED).json({ message: "ok" });
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
