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
import * as http from "http";

import { dealRouter } from "./routes/dealRouter";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());

app.use("/api/tasks", taskRouter);
app.use("/api/todos", todoRouter);
app.use("/api/habits", habitRouter);
app.use("/api/settings", settingsRouter);
app.use("/users", userRouter);
app.use("/api/statistics", statisticsRounter);
app.use("/api/deals", dealRouter);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});




// create server
const server = http.createServer(app);
const io = new Server(server);



server.listen(8080, () => console.log("Webserver is listening on port 8080"));

// socket
io.on("connection", function (socket) {
  socket.on("wake-me", function (seconds: number) {
    setTimeout(() => {
      socket.emit("wake-up", `This is the ${seconds} seconds wakeup call!`);
    }, seconds * 1000);
  });

  socket.on("wake-all", function (seconds: number) {
    setTimeout(() => {
      io.emit("wake-up", `This is the ${seconds} seconds public broadcast!`);
    }, seconds * 1000);
  });
});
