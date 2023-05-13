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
exports.dbFileName = "database.db";
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
    static ensureTablesCreated(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.run(`
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                email TEXT,                
                birthdate TEXT,
                points INTEGER,
                level INTEGER,
                registrationDate TEXT
            ) `);
            yield connection.run(`
            create table if not exists habit (
                id INTEGER PRIMARY KEY,
                title TEXT NOT NULL,
                frequency TEXT NOT NULL,
                reminder TEXT,
                category TEXT,
                color TEXT NOT NULL,
                userId INTEGER NOT NULL,
                FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
            ) strict;`);
            yield connection.run(`
            create table if not exists setting(
               id INTEGER PRIMARY KEY,
               theme TEXT UNIQUE NOT NULL,
               userId INTEGER NOT NULL,
               userProfile TEXT NOT NULL,
               FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
            ) strict;`);
            yield connection.run(`
            create table if not exists deal(
               id INTEGER PRIMARY KEY,
               name TEXT NOT NULL,
               habitId INTEGER NOT NULL,
               type TEXT NOT NULL,
               FOREIGN KEY (habitId) REFERENCES habit (id) ON DELETE CASCADE
            ) strict;`);
        });
    }
}
exports.DB = DB;
