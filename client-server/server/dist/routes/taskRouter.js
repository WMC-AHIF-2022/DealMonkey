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
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const task_repository_1 = require("../data/repositories/task-repository");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.get("/:userId", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = Number.parseInt(request.params.userId);
    const habits = yield (0, task_repository_1.getAllTasks)(userId);
    response.status(http_status_codes_1.StatusCodes.OK).json(habits);
}));
/*taskRouter.post("/", async (request, response) => {
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
  
    //Todo: Validation
  
    const newTask: Task = {
      id: -1,
      title: title,
      category: category,
      color: color,
      userId: userId,
    };
  
    try {
      console.log(newTask);
      addTask(newTask);
      console.log("war in add");
      console.log(newTask);

      response.status(StatusCodes.CREATED).json(newTask);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});*/
exports.taskRouter.delete("/:id", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(request.params.id);
    try {
        yield (0, task_repository_1.deleteTask)(id);
        response.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ message: "Task deleted" });
    }
    catch (error) {
        response.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(error);
    }
}));
/*taskRouter.put("/", async (request, response) => {
    const id = Number.parseInt(request.body.id);
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
    
    const task: Task = {
      id: id,
      title: title,
      category: category,
      color: color,
      userId: userId,
    };
  
    try {
      await updateTask(task);
      response.status(StatusCodes.ACCEPTED).json(task);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});*/ 
