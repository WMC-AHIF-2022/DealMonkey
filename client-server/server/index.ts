import dotenv from "dotenv";
import express, { Express } from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import { taskRouter } from "./routes/taskRouter";
import { todoRouter } from "./routes/todoRouter";
import { habitRouter } from "./routes/habitRouter";
import { settingsRouter } from "./routes/settingRouter";
import { statisticsRounter } from "./routes/statisticsRouter";
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
