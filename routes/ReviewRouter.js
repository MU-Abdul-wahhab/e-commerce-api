import express from "express";
import {
  createReview
} from "../controllers/reviewController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const ReviewRouter = express.Router();

ReviewRouter.post("/:productId", isLoggedIn, createReview);


export default ReviewRouter;
