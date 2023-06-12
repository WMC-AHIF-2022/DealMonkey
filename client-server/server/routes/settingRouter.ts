import express from "express";
import { StatusCodes } from "http-status-codes";
import {
  updateSettings,
  getSettingById,
} from "../data/repositories/setting-repository";
import { Setting } from "../data/interfaces/model";

require("dotenv").config();

export const settingsRouter = express.Router();

settingsRouter.put("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const profile = request.body.profile;

  try {
    updateSettings(profile, id);
    response.status(StatusCodes.ACCEPTED).json({ message: "settings updated" });
  } catch (error) {
    response.status(StatusCodes.BAD_REQUEST).json(error);
  }
});

settingsRouter.get("/:id", async (request, response) => {
  const id: number = Number(request.params.id);
  const setting: Setting | undefined = await getSettingById(id);

  if (setting == undefined) {
    response.sendStatus(StatusCodes.BAD_REQUEST);
  } else {
    response.status(StatusCodes.OK).json(setting);
  }
});
