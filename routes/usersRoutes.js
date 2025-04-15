import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/api/v1/users/register', registerUser);
userRouter.post('/api/v1/users/login', loginUser);

export default userRouter;