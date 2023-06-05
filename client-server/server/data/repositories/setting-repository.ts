import { DB } from "../../database";
import { Setting } from "../interfaces/model";

export async function updateSettings(profile: string, userId: number) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "update setting set userProfile = ?1 where userId = ?2"
  );
  await stmt.bind({
    1: profile,
    2: userId,
  });
  const operationResult = await stmt.run();
  stmt.finalize();
  db.close();
}

export async function getSettingById(id: number): Promise<Setting | undefined> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`SELECT * FROM setting WHERE id = ?1`);
  await stmt.bind({ 1: id });
  const setting: Setting | undefined = await stmt.get<Setting>();
  await stmt.finalize();
  await db.close();
  return setting!;
}

export async function addSetting(userId: number) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "INSERT INTO setting (THEME, USERID, USERPROFILE) VALUES (?1, ?2, ?3)"
  );
  await stmt.bind({
    1: "light",
    2: userId,
    3: "https://i.pinimg.com/564x/2e/60/80/2e60808c2b288e393128ebed7ee988b6.jpg",
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

  console.log("settings done");
}