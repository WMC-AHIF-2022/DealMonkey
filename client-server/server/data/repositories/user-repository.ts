import { User } from "../interfaces/user";
import { DB } from "../../database";

export async function addUser(user: User) {
  console.log("add user");
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
): Promise<boolean> {
  const db = await DB.createDBConnection();
  const stmt = await db.prepare(`SELECT * FROM user WHERE username = ?1`);
  await stmt.bind({ 1: username });
  const result: User | undefined = await stmt.get<User>();
  await stmt.finalize();
  await db.close();

  return typeof result !== "undefined" && result.password === password;
}

export async function deleteUser(id:number): Promise<boolean> {
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
  await db.all('truncate table user');
  await db.close();
}