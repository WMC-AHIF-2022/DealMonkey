import dotenv from "dotenv";
import express, { Express } from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import { taskRouter } from "./routes/taskRouter";
import { todoRouter } from "./routes/todoRouter";
import { habitRouter } from "./routes/habitRouter";
import { settingsRouter } from "./routes/settingRouter";
import { statisticsRounter } from "./routes/statisticsRouter";
import { Server } from "socket.io";
import { progressRouter } from "./routes/progressRouter";
import { dealRouter } from "./routes/dealRouter";
import { taskQueueRouter } from "./routes/taskQueueRouter";

dotenv.config();
const app: Express = express();

const uuidv4 = require("uuidv4");

app.use(express.json());
app.use(cors());
const http = require("http").Server(app);

app.use("/api/tasks", taskRouter);
app.use("/api/todos", todoRouter);
app.use("/api/habits", habitRouter);
app.use("/api/settings", settingsRouter);
app.use("/users", userRouter);
app.use("/api/statistics", statisticsRounter);
app.use("/api/deals", dealRouter);
app.use("/api/progress", progressRouter);
app.use("/api/taskQueue", taskQueueRouter);

const port = 8000;

/*
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
*/

http.listen(port, () => console.log("Webserver is listening on port 8000"));

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//Add this before the app.get() block
socketIO.on("connection", (socket: any) => {
  //console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("new habit", function (seconds: number, title: string, id: number) {
    setTimeout(() => {
      socket.emit("do habit", title, id);
    }, seconds * 1000);
  });

  socket.disconnect(console.log("🔥: A user disconnected"));
});
