import { Habit } from "../interfaces/habit";
import { Task } from "../interfaces/task";
import { DB } from "../../database";
import { addTask, updateTask } from "./task-repository";

export async function getAllHabits(userId: number): Promise<Habit[]> {
  const db = await DB.createDBConnection();

  const habits = await db.all<Habit[]>("SELECT * FROM habit");
  habits.filter(habit => habit.userId === userId);

  await db.close();
  return habits!;
}

export async function addHabit(task:Task, frequency:string, reminder:string) {
  //adding task (parent) to get id
  const id = await addTask(task);
  console.log(id);

  //adding habit:
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("INSERT INTO habit VALUES (?1, ?2, ?3)");
  await stmt.bind({
    1: id,
    2: frequency,
    3: reminder,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();
  await db.close();

  if (
    typeof operationResult.changes !== "number" ||
    operationResult.changes !== 1
  ) {
    throw new Error("Could not add habit");
  } 

  //returning new habit
  const jsonString = JSON.stringify({id: id, frequency: frequency, reminder: reminder});
  return <Habit>JSON.parse(jsonString);
}

export async function updateHabit(task: Task, frequency:string, reminder:string) {
  //updating task (parent)
  const id = await updateTask(task);

  //updating habit:
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("update habit set frequency = ?2, reminder = ?3 where id = ?1");
  await stmt.bind({
    1: id,
    2: frequency,
    3: reminder,
  });
  const operationResult = await stmt.run();
  stmt.finalize();
  db.close();

  //returning new habit
  const jsonString = JSON.stringify({id: id, frequency: frequency, reminder: reminder});
  return <Habit>JSON.parse(jsonString);
}
