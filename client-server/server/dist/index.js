"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const socket_io_1 = require("socket.io");
const progressRouter_1 = require("./routes/progressRouter");
const dealRouter_1 = require("./routes/dealRouter");
const taskQueueRouter_1 = require("./routes/taskQueueRouter");
const http = __importStar(require("http"));
const database_1 = require("./database");
const avatarRouter_1 = require("./routes/avatarRouter");
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
app.use("/api/deals", dealRouter_1.dealRouter);
app.use("/api/progress", progressRouter_1.progressRouter);
app.use("/api/taskQueue", taskQueueRouter_1.taskQueueRouter);
app.use("/api/avatars", avatarRouter_1.avatarRouter);
const port = 8000;
const server = http.createServer(app);
server.listen(port);
database_1.DB.createAvatars();
//const socketIO = require("socket.io")(http, {});
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
//Add this before the app.get() block
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("new habit", (seconds, title, id) => {
        setTimeout(() => {
            socket.emit("do habit", title, id);
        }, seconds * 1000);
    });
    socket.on("disconnect", function () {
        console.log("🔥: A user disconnected");
    });
});
