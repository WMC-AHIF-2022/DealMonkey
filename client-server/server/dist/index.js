"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const userRouter_1 = require("./routes/userRouter");
const cors_1 = __importDefault(require("cors"));
const taskRouter_1 = require("./routes/taskRouter");
const todoRouter_1 = require("./routes/todoRouter");
const habitRouter_1 = require("./routes/habitRouter");
const settingRouter_1 = require("./routes/settingRouter");
const statisticsRouter_1 = require("./routes/statisticsRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/tasks", taskRouter_1.taskRouter);
app.use("/api/todos", todoRouter_1.todoRouter);
app.use("/api/habits", habitRouter_1.habitRouter);
app.use("/api/settings", settingRouter_1.settingsRouter);
app.use("/users", userRouter_1.userRouter);
app.use("/api/statistics", statisticsRouter_1.statisticsRounter);
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
