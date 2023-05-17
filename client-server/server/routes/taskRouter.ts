import express from "express";
import { StatusCodes } from "http-status-codes";
import { Task } from "../data/interfaces/task";
import { getAllTasks, addTask, deleteTask, updateTask } from "../data/repositories/task-repository";

export const taskRouter = express.Router();

taskRouter.get("/:userId", async (request, response) => {
    const userId = Number.parseInt(request.params.userId);
    const habits = await getAllTasks(userId);
    response.status(StatusCodes.OK).json(habits);
});

taskRouter.post("/", async (request, response) => {
    const title: string = request.body.title;
    const category: string = request.body.category;
    const color: string = request.body.color;
    const userId: number = Number.parseInt(request.body.userId);
  
    //Todo: Validation
  
    const newTask: Task = {
      id: -1,
      title,
      category,
      color,
      userId,
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
});

taskRouter.delete("/:id", async (request, response) => {
    const id = Number.parseInt(request.params.id);
  
    try {
      await deleteTask(id);
      response.status(StatusCodes.ACCEPTED).json({ message: "Task deleted" });
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});
  
taskRouter.put("/", async (request, response) => {
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
      const updatedTask: Task = await updateTask(task);
      response.status(StatusCodes.ACCEPTED).json(updatedTask);
    } catch (error) {
      response.status(StatusCodes.BAD_REQUEST).json(error);
    }
});