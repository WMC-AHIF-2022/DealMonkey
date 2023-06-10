import express from "express";
import { StatusCodes } from "http-status-codes";
import { Deal } from "../data/interfaces/model";
import { getAllDealsByUser } from "../data/repositories/deal-repository";

export const dealRouter = express.Router();

dealRouter.get("/:userId", async (request, response) => {
    const userId = Number.parseInt(request.params.userId);
    const deals = await getAllDealsByUser(userId);
    response.status(StatusCodes.OK).json(deals);
});

