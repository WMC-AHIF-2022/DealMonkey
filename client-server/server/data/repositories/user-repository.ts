import { User } from "../interfaces/user";
import { DB } from "../../database";

/*
id: -1,
        username: username,
        password: password,
        email: email,
        birthdate: birthdate,
        points: 100,
        level: 1,
        registrationDate: new Date().toISOString()
*/

export async function addUser(user: User) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('INSERT INTO user (USERNAME, PASSWORD, EMAIL, BIRTHDATE) VALUES (?1, ?2, ?3, ?4)');
    await stmt.bind({1: user.username, 2: user.password, 3: user.email, 4: user.birthdate});
    const operationResult = await stmt.run();
    await stmt.finalize();
    await db.close();

    if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Username is already known");
    }
    else {
        user.id = operationResult.lastID!;
    }
}

export async function getAllUsers(): Promise<User[]>{
    const db = await DB.createDBConnection();
    const users: User[] = await db.all<User[]>('SELECT * FROM user');
    await db.close();
    return users;
}

export async function getUserById(id:number): Promise<User | undefined>  {
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM user WHERE id = ?1`);
    await stmt.bind({1: id});
    const user: User | undefined = await stmt.get<User>();
    await stmt.finalize();
    await db.close();
    return user;
}

export async function isAuthorized(username: string, password: string): Promise<boolean> {
    const db = await  DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM user WHERE username = ?1`);
    await stmt.bind({1: username});
    const result: User | undefined = await stmt.get<User>();
    await stmt.finalize();
    await db.close();

    return typeof result !== "undefined" && result.password === password;
}