import dotenv from "dotenv";
import express, { Express } from "express";
import { userRouter } from "./routes/userRouter";
import cors from "cors";
import { habitRouter } from "./routes/habitRouter";

dotenv.config();
const app: Express = express();

app.use(express.json());
app.use(cors());
app.use("/api/habits", habitRouter);
app.use("/users", userRouter); //for login und signup

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
