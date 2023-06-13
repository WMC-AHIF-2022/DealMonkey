import { NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("isAuthenticated");

  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("No bearer token available");
    }
    // check if the token is valid => otherwise an error is thrown
    jwt.verify(token, process.env.PRIVATE_KEY);
    next();
  } catch (err) {
    res.status(401).send(`Please authenticate! ${err}`);
  }
};
