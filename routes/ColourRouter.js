import express from "express";
import {
  createColour,
  getAllColour,
  getSingleColour,
  updateColour,
  deleteColour,
} from "../controllers/colorController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const ColourRouter = express.Router();

ColourRouter.post("/", isLoggedIn, createColour);
ColourRouter.get("/", getAllColour);
ColourRouter.get("/:id", isLoggedIn, getSingleColour);
ColourRouter.put("/:id", isLoggedIn, updateColour);
ColourRouter.delete("/:id", isLoggedIn, deleteColour);

export default ColourRouter;
