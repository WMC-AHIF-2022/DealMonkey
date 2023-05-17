import { Todo } from "../interfaces/todo";
import { Task } from "../interfaces/task";
import { DB } from "../../database";
import { addTask } from "./task-repository";

export async function getAllTodos(userId: number): Promise<Todo[]> {
  const db = await DB.createDBConnection();

  const todos = await db.all<Todo[]>("SELECT * FROM todo");
  todos.filter(todo => todo.userId === userId);

  await db.close();
  return todos!;
}

export async function addTodo(task: Task, priority: string) {
  const id = await addTask(task);
  console.log(id);
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
}

export async function deleteTodo(id: number) {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("delete from todo where id = ?1");
  await stmt.bind({ 1: id });
  await stmt.run();

  await stmt.finalize();
  await db.close();
}

export async function updateTodo(todo: Todo):Promise<Todo> {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("update todo set title = ?1, category = ?2, color = ?3, priority = ?4 where id = ?5");
  await stmt.bind({
    1: todo.title,
    2: todo.category,
    3: todo.color,
    4: todo.priority,
    5: todo.id
  });

  await stmt.run();
  stmt.finalize();
  db.close();

  return todo;
}