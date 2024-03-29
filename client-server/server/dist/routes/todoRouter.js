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
exports.todoRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const todo_repository_1 = require("../data/repositories/todo-repository");
exports.todoRouter = express_1.default.Router();
exports.todoRouter.get("/:userId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.parseInt(request.params.userId);
    const todos = yield (0, todo_repository_1.getAllTodos)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(todos);
}));
exports.todoRouter.post("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const title = request.body.title;
    const category = request.body.category;
    const color = request.body.color;
    const userId = Number.parseInt(request.body.userId);
    const priority = request.body.priority;
    //Todo: Validation
    const newTask = {
        id: -1,
        title: title,
        category: category,
        color: color,
        userId: userId,
    };
    try {
        const addedTodo = yield (0, todo_repository_1.addTodo)(newTask, priority);
        response.status(http_status_codes_1.StatusCodes.CREATED).json(addedTodo);
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
exports.todoRouter.put("/", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(request.body.id);
    const title = request.body.title;
    const category = request.body.category;
    const color = request.body.color;
    const userId = Number.parseInt(request.body.userId);
    const priority = request.body.priority;
    const task = {
        id: id,
        title: title,
        category: category,
        color: color,
        userId: userId,
    };
    try {
        const updatedTodo = yield (0, todo_repository_1.updateTodo)(task, priority);
        response.status(http_status_codes_1.StatusCodes.ACCEPTED).json(updatedTodo);
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
