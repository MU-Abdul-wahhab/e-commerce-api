import express from 'express';
import dbConnect from '../config/dbConnect.js';
import dotenv from 'dotenv';
import userRouter from '../routes/usersRoutes.js';
import { globalErrorHandler , notFound } from '../middlewares/globalErrorHAndler.js';
import productRouter from '../routes/productRoutes.js';

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());
app.use('/api/v1/users/', userRouter);
app.use('/api/v1/products/', productRouter);


app.use(notFound);
app.use(globalErrorHandler);
export default app;