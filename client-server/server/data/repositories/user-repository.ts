import { User, loginAuthResult } from "../interfaces/user";
import { DB } from "../../database";

export async function addUser(user: User) {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(
    "INSERT INTO user (USERNAME, PASSWORD, EMAIL) VALUES (?1, ?2, ?3)"
  );
  await stmt.bind({
    1: user.username,
    2: user.password,
    3: user.email,
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
    user.id = operationResult.lastID!;
  }

  await addSetting(user.id);
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
}

export async function getAllUsers(): Promise<User[]> {
  const db = await DB.createDBConnection();
  const users: User[] = await db.all<User[]>("SELECT * FROM user");
  await db.close();
  return users;
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`SELECT * FROM user WHERE id = ?1`);
  await stmt.bind({ 1: id });
  const user: User | undefined = await stmt.get<User>();
  await stmt.finalize();
  await db.close();
  return user;
}

export async function isAuthorized(
  username: string,
  password: string
): Promise<User | undefined> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`SELECT * FROM user WHERE username = ?1`);
  await stmt.bind({ 1: username });
  const result: User | undefined = await stmt.get<User>();
  await stmt.finalize();
  await db.close();

  return result;
}

export async function deleteUser(id: number): Promise<boolean> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`DELETE FROM user WHERE id = ?1`);
  await stmt.bind({ 1: id });
  const result: User | undefined = await stmt.get<User>();
  await stmt.finalize();
  await db.close();
  return result !== undefined;
}

export async function deleteAllUsers(): Promise<void> {
  const db = await DB.createDBConnection();
  await db.all("truncate table user");
  await db.close();
}
