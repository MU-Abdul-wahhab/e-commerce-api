import express from "express";
import {
  createBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/admin.js";

const BrandRouter = express.Router();

BrandRouter.post("/", isLoggedIn, isAdmin, createBrand);
BrandRouter.get("/", getAllBrand, isLoggedIn);
BrandRouter.get("/:id", isLoggedIn, getSingleBrand);
BrandRouter.put("/:id", isLoggedIn, updateBrand);
BrandRouter.delete("/:id", isLoggedIn, deleteBrand);

export default BrandRouter;
