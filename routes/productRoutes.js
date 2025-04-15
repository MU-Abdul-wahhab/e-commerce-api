import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createProduct, getAllproducts } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/" , isLoggedIn , createProduct);

productRouter.get("/" , getAllproducts)

export default productRouter;
