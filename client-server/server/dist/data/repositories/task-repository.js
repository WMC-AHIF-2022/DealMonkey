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
exports.updateTask = exports.deleteTask = exports.deleteTableTask = exports.addTask = exports.getAllTasks = void 0;
const database_1 = require("../../database");
function getAllTasks(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const tasks = yield db.all("SELECT * FROM task");
        tasks.filter(task => task.userId === userId);
        yield db.close();
        return tasks;
    });
}
exports.getAllTasks = getAllTasks;
function addTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO task (TITLE, CATEGORY, COLOR, USERID) VALUES (?1, ?2, ?3, ?4)");
        yield stmt.bind({
            1: task.title,
            2: task.category,
            3: task.color,
            4: task.userId,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
            throw new Error("Could not add task");
        }
        else {
            task.id = operationResult.lastID;
        }
        return task.id;
    });
}
exports.addTask = addTask;
function deleteTableTask() {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        yield db.all("DROP FROM task");
        yield db.close();
    });
}
exports.deleteTableTask = deleteTableTask;
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("delete from task where id = ?1");
        yield stmt.bind({ 1: id });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.deleteTask = deleteTask;
function updateTask(task) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("update task set title = ?1, category = ?2, color = ?3 where id = ?4");
        yield stmt.bind({
            1: task.title,
            2: task.category,
            3: task.color,
            4: task.id,
        });
        const operationResult = yield stmt.run();
        stmt.finalize();
        db.close();
        return task.id;
    });
}
exports.updateTask = updateTask;