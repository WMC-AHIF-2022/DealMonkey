import { Task } from "../interfaces/task";
import { DB } from "../../database";

export async function getAllTasks(userId: number): Promise<Task[]> {
  const db = await DB.createDBConnection();

  const tasks = await db.all<Task[]>("SELECT * FROM task");
  tasks.filter(task => task.userId === userId);

  await db.close();
  return tasks!;
}

export async function addTask(task: Task):Promise<number> {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("INSERT INTO task (TITLE, CATEGORY, COLOR, USERID) VALUES (?1, ?2, ?3, ?4)");
  await stmt.bind({
    1: task.title,
    2: task.category,
    3: task.color,
    4: task.userId,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();

  await db.close();

  if ( typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
    throw new Error("Could not add task");
  } else {
    task.id = operationResult.lastID!;
  }

  return task.id;
}


export async function deleteTableTask() {
  const db = await DB.createDBConnection();
  await db.all("DROP FROM task");
  await db.close();
}

export async function deleteTask(id: number) {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("delete from task where id = ?1");
  await stmt.bind({ 1: id });
  const operationResult = await stmt.run();

  await stmt.finalize();
  await db.close();
}

export async function updateTask(task: Task):Promise<Task> {
  const db = await DB.createDBConnection();

  const stmt = await db.prepare("update task set title = ?1, category = ?2, color = ?3 where id = ?4");
  await stmt.bind({
    1: task.title,
    2: task.category,
    3: task.color,
    4: task.id,
  });
  const operationResult = await stmt.run();

  stmt.finalize();
  db.close();

  return task;
}