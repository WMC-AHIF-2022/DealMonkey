"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.dbFileName = void 0;
const sqlite3_1 = require("sqlite3");
const sqlite_1 = require("sqlite");
const avatar_repository_1 = require("./data/repositories/avatar-repository");
exports.dbFileName = "./database.db";
class DB {
    static createDBConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const dbConnection = yield (0, sqlite_1.open)({
                filename: `./${exports.dbFileName}`,
                driver: sqlite3_1.Database,
            });
            yield DB.ensureTablesCreated(dbConnection);
            return dbConnection;
        });
    }
    static createAvatars() {
        return __awaiter(this, void 0, void 0, function* () {
            const avatars = [
                ["/data/img/monkey-glasses.jpg", "Monkey with Glasses", 100, 1],
                ["/data/img/wild-monkey.jpg", "Wild Monkey", 150, 1],
                ["/data/img/donkey-kong-veryHard.jpg", "Donkey Kong", 275, 1],
                ["/data/img/evil.jpeg", "Evil Monkey", 325, 2],
                ["/data/img/donkey-kong.jpg", "Donkey Kong", 390, 2],
                ["/data/img/praying-monkey.png", "Shocked Monkey", 430, 3],
                ["/data/img/gangsta-monkey.png", "Gangsta Monkey", 450, 3],
                ["/data/img/grandpa-monkey.jpg", "Grandpa Monkey", 500, 4],
                ["/data/img/kim&kanye.jpeg", "Kim & Kanye", 550, 4],
                ["/data/img/looting-cat.jpeg", "Looting Cat", 600, 5],
                ["/data/img/material-gworl.jpeg", "Material Gworl", 625, 5],
                ["/data/img/running-baby.png", "Running Baby", 650, 5],
                ["/data/img/walking-minion.jpeg", "Walking Minion", 700, 6],
            ];
            for (const avatar of avatars) {
                const link = avatar.at(0).toString();
                const name = avatar.at(1).toString();
                const price = Number.parseInt(avatar.at(2).toString());
                const unlockLevel = Number.parseInt(avatar.at(3).toString());
                const newAvatar = {
                    avatarId: -1,
                    link: link,
                    name: name,
                    price: price,
                    unlockLevel: unlockLevel,
                };
                yield (0, avatar_repository_1.insertAvatar)(newAvatar);
            }
        });
    }
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`PRAGMA foreign_keys = ON`);
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT,                
                birthdate TEXT,
                registrationDate TEXT
            ) `);
            yield connection.run(`
            create table if not exists setting (
               id INTEGER PRIMARY KEY,
               theme TEXT NOT NULL,
               userId INTEGER NOT NULL,
               userProfile TEXT NOT NULL,
               FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
            )`);
            yield connection.run(`
            create table if not exists task (
              id INTEGER PRIMARY KEY,
              title TEXT NOT NULL,
              category TEXT,
              color TEXT NOT NULL,
              userId INTEGER NOT NULL,
              FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
            )`);
            yield connection.run(`
            create table if not exists deal (
               id INTEGER PRIMARY KEY,
               taskId INTEGER NOT NULL,
               points INTEGER NOT NULL,
               FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE
            )`);
            yield connection.run(`
            create table if not exists todo (
                id INTEGER,
                priority TEXT NOT NULL,
                FOREIGN KEY (id) REFERENCES task(id) ON DELETE CASCADE
            )`);
            yield connection.run(`
            create table if not exists habit (
              id INTEGER,
              frequency TEXT NOT NULL,
              reminder TEXT,
              FOREIGN KEY (id) REFERENCES task(id) ON DELETE CASCADE
          )`);
            yield connection.run(`
            create table if not exists statistic (
              userId INTEGER,
              currentStreak INTEGER,
              highestStreak INTEGER,
              pointsMultiplier INTEGER,
              FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
          )`);
            yield connection.run(`
          create table if not exists progress (
            userId INTEGER NOT NULL,
            points INTEGER NOT NULL,
            experience INTEGER NOT NULL,
            FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
        )`);
            yield connection.run(`
        create table if not exists userAvatars (
          avatarId INTERGER NOT NULL,
          userId INTEGER NOT NULL,
          FOREIGN KEY (avatarId) REFERENCES avatar(avatarId) ON DELETE CASCADE,
          FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
      )`);
            yield connection.run(`
      create table if not exists avatar (
        avatarId INTERGER PRIMARY KEY,
        link TEXT NOT NULL,
        name TEXT,
        price INTEGER NOT NULL,
        unlockLevel INTEGER NOT NULL
    )`);
            yield connection.run(`
      create table if not exists taskQueue(
        userId INTEGER NOT NULL,
        taskId INTEGER NOT NULL,
        completed INTEGER default 0,
        dateOfCompletion TEXT,
        FOREIGN KEY (taskId) REFERENCES task(id) ON DELETE CASCADE,
        FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
    )`);
        });
    }
}
exports.DB = DB;
