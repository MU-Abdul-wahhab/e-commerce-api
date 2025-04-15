import express from "express";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createProduct, deleteProduct, getAllproducts, getSingleProduct, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/" , isLoggedIn , createProduct);

productRouter.get("/" , getAllproducts);
productRouter.get("/:id" , getSingleProduct);
productRouter.put("/:id" , isLoggedIn ,updateProduct);
productRouter.delete("/:id/delete" , isLoggedIn ,deleteProduct);

export default productRouter;
