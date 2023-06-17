import { DB } from "../../database";
import { Progress } from "../interfaces/model";
import { getUserById } from "./user-repository";

export async function getProgressByUserId(userId: number): Promise<Progress> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("select * from Progress where userId = ?1");
  await stmt.bind({ 1: userId });
  const progress = await stmt.get<Progress>();
  await stmt.finalize();
  await db.close();
  return progress!;
}

export async function addProgress(userId: number) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare("INSERT INTO progress VALUES (?1, ?2, ?3)");
  await stmt.bind({
    1: userId,
    2: 100,
    3: 1,
  });
  const operationResult = await stmt.run();
  await stmt.finalize();
  await db.close();

  if (
    typeof operationResult.changes !== "number" ||
    operationResult.changes !== 1
  ) {
    throw new Error("Username is already known");
  } else {
    userId = operationResult.lastID!;
  }

  console.log("progress done");
}

export async function updateProgress(
  userId: number,
  points: number,
  experience: number
) {
  const progress: Progress = await getProgressByUserId(userId);
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "update progress set points = ?1, experience = ?2 where userId = ?3"
  );
  await stmt.bind({
    1: progress.points + points,
    2: progress.experience + experience,
    3: userId,
  });
  await stmt.run();
  await stmt.finalize();
  await db.close();
}

//f(x) = 50x^2 + 150x + 100
//x ... level
//f(x) ... experience

//umkehrfunktion g(y)
//y ... experience
//g(y) ... level
function calculateLevel(experience: number): number {
  return Math.floor((Math.sqrt(50 * experience + 625) - 75) / 50) + 2;
}

async function calculateExperience(userId: number): Promise<number> {
  const progress = await getProgressByUserId(userId);
  const level = calculateLevel(progress!.experience);

  //random experience between 50 and 80 * the current level the user is in
  return (Math.floor(Math.random() * 80) + 50) * level;
}

export async function calculatePoints(userId: number): Promise<number> {
  const progress = await getProgressByUserId(userId);
  console.log(progress);
  const level = calculateLevel(progress!.experience);
  console.log(level);

  return (
    Math.ceil((Math.log10(level * 10) + 20) * (progress!.experience / 100)) + 10
  );
}
