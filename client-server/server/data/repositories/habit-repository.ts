import { Habit, Task } from "../interfaces/model";
import { DB } from "../../database";
import { addTask, getAllTasks, updateTask } from "./task-repository";
import { addDeal } from "./deal-repository";

export async function getAllHabits(userId: number): Promise<Habit[]> {
  const db = await DB.createDBConnection();

  const tasks = await getAllTasks(userId);
  const habits = await db.all<Habit[]>("SELECT * FROM habit");

  const userHabits: Habit[] = [];
  for (let i = 0; i < habits.length; i++) {
    for (let j = 0; j < tasks.length; j++) {
      if (tasks[j].userId === userId && habits[i].id === tasks[j].id) {
        userHabits.push({
          id: tasks[j].id,
          title: tasks[j].title,
          color: tasks[j].color,
          category: tasks[j].category,
          userId: tasks[j].userId,
          frequency: habits[i].frequency,
          reminder: habits[i].reminder,
        });
      }
    }
  }

  await db.close();
  return userHabits!;
}

export async function addHabit(
  task: Task,
  frequency: string,
  reminder: string
) {
  //adding task (parent) to get id
  const id = await addTask(task);

  console.log("created parent task for habit");

  //adding deal for this habit:
  await addDeal(id);

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
  const jsonString = JSON.stringify({
    id: id,
    frequency: frequency,
    reminder: reminder,
  });
  return <Habit>JSON.parse(jsonString);
}

export async function updateHabit(
  task: Task,
  frequency: string,
  reminder: string
) {
  //updating task (parent)
  const id = await updateTask(task);

  //updating habit:
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "update habit set frequency = ?2, reminder = ?3 where id = ?1"
  );
  await stmt.bind({
    1: id,
    2: frequency,
    3: reminder,
  });
  const operationResult = await stmt.run();
  stmt.finalize();
  db.close();

  //returning new habit
  const jsonString = JSON.stringify({
    id: id,
    frequency: frequency,
    reminder: reminder,
  });
  return <Habit>JSON.parse(jsonString);
}
