import express from "express";
import {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const categoryRouter = express.Router();

categoryRouter.post("/", isLoggedIn, createCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", isLoggedIn, getSingleCategory);
categoryRouter.put("/:id", isLoggedIn, updateCategory);
categoryRouter.delete("/:id", isLoggedIn, deleteCategory);

export default categoryRouter;
