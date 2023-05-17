import express from "express";
import { StatusCodes } from "http-status-codes";
import { Todo } from "../data/interfaces/todo";
import { Task } from "../data/interfaces/task";
import { getAllTodos, addTodo, deleteTodo, updateTodo } from "../data/repositories/todo-repository";

export const todoRouter = express.Router();

todoRouter.get("/:userId", async (request, response) => {
    const userId = Number.parseInt(request.params.userId);
    const todos = await getAllTodos(userId);
    response.status(StatusCodes.OK).json(todos);
});


todoRouter.post("/", async (request, response) => {
    const id: number = Number.parseInt(request.body.id);
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
    const priority: string = request.body.priority;
  
    //Todo: Validation
  
    const newTask: Task = {
      id: id,
      title: title,
      category: category,
      color: color,
      userId: userId,
    };
  
    try {
      await addTodo(newTask, priority);
      response.status(StatusCodes.CREATED).json(newTask);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});

todoRouter.delete("/:id", async (request, response) => {
    const id = Number.parseInt(request.params.id);
  
    try {
      await deleteTodo(id);
      response.status(StatusCodes.ACCEPTED).json({ message: "Todo deleted" });
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
    
    const todo: Todo = {
      id: id,
      title: title,
      category: category,
      color: color,
      userId: userId,
      priority: priority,
    };
  
    try {
      const updatedTodo: Todo = await updateTodo(todo);
      response.status(StatusCodes.ACCEPTED).json(updatedTodo);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});