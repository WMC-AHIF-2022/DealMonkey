import { Todo } from "../interfaces/todo";
import { Task } from "../interfaces/task";
import { DB } from "../../database";
import { addTask, updateTask } from "./task-repository";

export async function getAllTodos(userId: number): Promise<Todo[]> {
  const db = await DB.createDBConnection();

  const todos = await db.all<Todo[]>("SELECT * FROM todo");
  todos.filter(todo => todo.userId === userId);

  await db.close();
  return todos!;
}

export async function addTodo(task: Task, priority: string):Promise<Todo> {
  //adding task (parent) to get id
  const id = await addTask(task);

  //adding todo:
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("INSERT INTO todo VALUES (?1, ?2)");
  await stmt.bind({
    1: id,
    2: priority,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();

  await db.close();

  if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
    throw new Error("Could not add todo");
  } 

  //returning new todo
  const jsonString = JSON.stringify({id: id, priority: priority});
  return <Todo>JSON.parse(jsonString);
}

export async function updateTodo(task:Task, priority: string):Promise<Todo> {
  //updating task (parent)
  const id = await updateTask(task);

  //updating todo:
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("update todo set priority = ?2 where id = ?1");
  await stmt.bind({
    1: id,
    2: priority
  });

  await stmt.run();
  stmt.finalize();
  db.close();

  //returning new todo
  const jsonString = JSON.stringify({id: id, priority: priority});
  return <Todo>JSON.parse(jsonString);
}