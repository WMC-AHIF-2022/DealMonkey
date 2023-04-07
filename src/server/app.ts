// for installing all dependencies once run 'npm install'
// for starting the server run 'npm start'
// for starting the server in watchmode run 'npm run dev'

// import modules
import express from "express";
import cors from "cors";
import { taskRouter } from "./task-router";

// create express application
const app = express();

// mount middleware
app.use(cors());
app.use(express.json()); // parse JSON data and place result in req.body

// mount router(s)
app.use("/api/tasks", taskRouter);

// start http server
app.listen(5000, function () {
  console.log("Server listening on port 5000");
});
