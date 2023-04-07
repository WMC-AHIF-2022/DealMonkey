// import modules
import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  addTask,
  getAllTasks,
  getTaskById,
  removeAllTasks,
  removeTask,
  Task,
} from "./task-repository";

import { DB } from "./database";

// create router
export const taskRouter = express.Router();

taskRouter.get("/", async (request, response) => {
  const db = await DB.createDBConnection();
  const tasks = await db.all<Task[]>("select * from Todos");
  await db.close();
  response.status(StatusCodes.OK).json(tasks);
});

// return one task
taskRouter.get("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("select * from Todos where id = ?1");
  await stmt.bind({ 1: id });
  const task: Task | undefined = await stmt.get<Task>();
  await stmt.finalize();
  await db.close();
  if (task === undefined) {
    response.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  response.status(StatusCodes.OK).json(task);
});

// add task
taskRouter.post("/", async (request, response) => {
  const action: any = request.body.action;
  const done: any = request.body.done;
  if (typeof action !== "string" || action.trim().length === 0) {
    response.status(StatusCodes.BAD_REQUEST).send("action missing or not ok");
    return;
  }
  if (typeof done !== "boolean") {
    response.status(StatusCodes.BAD_REQUEST).send("done missing or not ok");
    return;
  }

  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "insert into Todos (action, done) values (?1, ?2)"
  );
  await stmt.bind({ 1: action, 2: done });
  const operationResult = await stmt.run();
  await stmt.finalize();
  await db.close();
  response.status(StatusCodes.CREATED).send(operationResult);
});

// update task
taskRouter.put("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const task: Task | undefined = getTaskById(id);
  if (task === undefined) {
    response.sendStatus(StatusCodes.NOT_FOUND);
    return;
  }
  const action: any = request.body.action;
  const done: any = request.body.done;
  if (typeof action !== "string" || action.trim().length === 0) {
    console.log("xxx");
    response.status(StatusCodes.BAD_REQUEST).send("action missing or not ok");
    return;
  }
  if (typeof done !== "boolean") {
    response.status(StatusCodes.BAD_REQUEST).send("done missing or not ok");
    return;
  }

  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "update Todos set action = ?1, done = ?2 where id = ?3"
  );
  await stmt.bind({
    1: action,
    2: done,
    3: id,
  });
  const operationResult = await stmt.run();
  stmt.finalize();
  db.close();

  if (operationResult.changes === null || operationResult.changes !== 1) {
    response.sendStatus(StatusCodes.NOT_FOUND);
  } else {
    response.sendStatus(StatusCodes.NO_CONTENT);
  }
});

// delete all tasks
taskRouter.delete("/", async (request, response) => {
  const db = await DB.createDBConnection();
  await db.exec("delete from Todos");
  await db.close();
  response.sendStatus(StatusCodes.NO_CONTENT);
});

// delete single task
taskRouter.delete("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("delete from Todos where id=?1");
  await stmt.bind({
    1: id,
  });
  const result = await stmt.run();
  stmt.finalize();
  await db.close();

  if (result === null || result.changes !== 1) {
    response.sendStatus(StatusCodes.NOT_FOUND);
  }
  response.sendStatus(StatusCodes.NO_CONTENT);
});
