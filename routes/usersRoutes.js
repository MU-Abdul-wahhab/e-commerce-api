import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
  updateShippingAddress,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", isLoggedIn , getUserProfile);
userRouter.put("/update-shipping-address", isLoggedIn , updateShippingAddress);

export default userRouter;
