import express from "express";
import {
  createBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const BrandRouter = express.Router();

BrandRouter.post("/", isLoggedIn, createBrand);
BrandRouter.get("/", getAllBrand);
BrandRouter.get("/:id", isLoggedIn, getSingleBrand);
BrandRouter.put("/:id", isLoggedIn, updateBrand);
BrandRouter.delete("/:id", isLoggedIn, deleteBrand);

export default BrandRouter;
