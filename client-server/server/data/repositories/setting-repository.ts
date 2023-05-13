import { DB } from "../../database";
import { Setting } from "../interfaces/setting";

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
