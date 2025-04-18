import express from "express";
import { createCoupen, deleteeCoupen, getAllCoupen, getSingleCoupen, updateCoupen } from "../controllers/coupenController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const CoupenRouter = express.Router();

CoupenRouter.post("/", isLoggedIn, createCoupen);
CoupenRouter.get("/", isLoggedIn, getAllCoupen);

CoupenRouter.get("/:coupenId", isLoggedIn, getSingleCoupen);
CoupenRouter.put("/:coupenId", isLoggedIn, updateCoupen);
CoupenRouter.delete("/:coupenId", isLoggedIn, deleteeCoupen);



export default CoupenRouter;
