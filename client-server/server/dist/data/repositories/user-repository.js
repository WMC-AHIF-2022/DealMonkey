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
exports.deleteAllUsers = exports.deleteUser = exports.isAuthorized = exports.getUserById = exports.getAllUsers = exports.addSetting = exports.addUser = void 0;
const database_1 = require("../../database");
function addUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
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
        yield addSetting(user.id);
    });
}
exports.addUser = addUser;
function addSetting(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO setting (THEME, USERID, USERPROFILE) VALUES (?1, ?2, ?3)");
        yield stmt.bind({
            1: "light",
            2: userId,
            3: "https://i.pinimg.com/564x/2e/60/80/2e60808c2b288e393128ebed7ee988b6.jpg",
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" ||
            operationResult.changes !== 1) {
            throw new Error("Username is already known");
        }
        else {
            userId = operationResult.lastID;
        }
    });
}
exports.addSetting = addSetting;
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
        return result;
    });
}
exports.isAuthorized = isAuthorized;
function deleteUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare(`DELETE FROM user WHERE id = ?1`);
        yield stmt.bind({ 1: id });
        const result = yield stmt.get();
        yield stmt.finalize();
        yield db.close();
        return result !== undefined;
    });
}
exports.deleteUser = deleteUser;
function deleteAllUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        yield db.all("truncate table user");
        yield db.close();
    });
}
exports.deleteAllUsers = deleteAllUsers;
