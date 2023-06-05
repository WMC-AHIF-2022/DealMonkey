import express from "express";
import { StatusCodes } from "http-status-codes";
import { Todo, Task } from "../data/interfaces/model";
import { getAllTodos, addTodo, updateTodo } from "../data/repositories/todo-repository";

export const todoRouter = express.Router();

todoRouter.get("/:userId", async (request, response) => {
    const userId = Number.parseInt(request.params.userId);
    const todos = await getAllTodos(userId);
    response.status(StatusCodes.OK).json(todos);
});

todoRouter.post("/", async (request, response) => {
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
    const priority: string = request.body.priority;
  
    //Todo: Validation
  
    const newTask: Task = {
      id: -1,
      title: title,
      category: category,
      color: color,
      userId: userId,
    };
  
    try {
      const addedTodo:Todo = await addTodo(newTask, priority);
      response.status(StatusCodes.CREATED).json(addedTodo);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});
  
todoRouter.put("/", async (request, response) => {
    const id = Number.parseInt(request.body.id);
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
    const priority: string = request.body.priority;
    
    const task: Task = {
      id: id,
      title: title,
      category: category,
      color: color,
      userId: userId,
    };
  
    try {
      const updatedTodo: Todo = await updateTodo(task, priority);
      response.status(StatusCodes.ACCEPTED).json(updatedTodo);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});