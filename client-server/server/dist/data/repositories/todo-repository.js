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
exports.updateTodo = exports.deleteTodo = exports.addTodo = exports.getAllTodos = void 0;
const database_1 = require("../../database");
const task_repository_1 = require("./task-repository");
function getAllTodos(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const todos = yield db.all("SELECT * FROM todo");
        todos.filter(todo => todo.userId === userId);
        yield db.close();
        return todos;
    });
}
exports.getAllTodos = getAllTodos;
function addTodo(task, priority) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = yield (0, task_repository_1.addTask)(task);
        console.log(id);
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("INSERT INTO todo VALUES (?1, ?2)");
        yield stmt.bind({
            1: id,
            2: priority,
        });
        const operationResult = yield stmt.run();
        yield stmt.finalize();
        yield db.close();
        if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
            throw new Error("Could not add todo");
        }
    });
}
exports.addTodo = addTodo;
function deleteTodo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("delete from todo where id = ?1");
        yield stmt.bind({ 1: id });
        yield stmt.run();
        yield stmt.finalize();
        yield db.close();
    });
}
exports.deleteTodo = deleteTodo;
function updateTodo(todo) {
    return __awaiter(this, void 0, void 0, function* () {
        const db = yield database_1.DB.createDBConnection();
        const stmt = yield db.prepare("update todo set title = ?1, category = ?2, color = ?3, priority = ?4 where id = ?5");
        yield stmt.bind({
            1: todo.title,
            2: todo.category,
            3: todo.color,
            4: todo.priority,
            5: todo.id
        });
        yield stmt.run();
        stmt.finalize();
        db.close();
        return todo;
    });
}
exports.updateTodo = updateTodo;
