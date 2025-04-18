import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import {
  createProduct,
  deleteProduct,
  getAllproducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/admin.js";

const productRouter = express.Router();

productRouter.post(
  "/",
  isLoggedIn,
  isAdmin,
  upload.array("files"),
  createProduct
);

productRouter.get("/", isLoggedIn, isAdmin, getAllproducts);
productRouter.get("/:id", isLoggedIn, isAdmin, getSingleProduct);
productRouter.put("/:id", isLoggedIn, isAdmin, updateProduct);
productRouter.delete("/:id/delete", isLoggedIn, isAdmin, deleteProduct);

export default productRouter;
