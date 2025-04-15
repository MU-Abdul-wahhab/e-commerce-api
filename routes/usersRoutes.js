import express from "express";
import {
  loginUser,
  registerUser,
  getUserProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.get("/profile", isLoggedIn , getUserProfile);

export default userRouter;
