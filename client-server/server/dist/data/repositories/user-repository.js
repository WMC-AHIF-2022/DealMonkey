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
exports.isAuthorized = exports.getUserById = exports.getAllUsers = exports.addUser = void 0;
const database_1 = require("../../database");
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
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("add user");
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO user (USERNAME, PASSWORD, EMAIL) VALUES (?1, ?2, ?3)");
        yield stmt.bind({
            1: user.username,
            2: user.password,
            3: user.email,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Username is already known");
        }
        else {
            user.id = operationResult.lastID;
        }
    });
}
exports.addUser = addUser;
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const users = yield db.all("SELECT * FROM user");
        yield db.close();
        return users;
    });
}
exports.getAllUsers = getAllUsers;
function getUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`SELECT * FROM user WHERE id = ?1`);
        yield stmt.bind({ 1: id });
        const user = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return user;
    });
}
exports.getUserById = getUserById;
function isAuthorized(username, password) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`SELECT * FROM user WHERE username = ?1`);
        yield stmt.bind({ 1: username });
        const result = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return typeof result !== "undefined" && result.password === password;
    });
}
exports.isAuthorized = isAuthorized;
