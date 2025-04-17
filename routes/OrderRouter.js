import express from "express";
import { createOrder , getAllOrders, getSingleOrder, updateOrder} from "../controllers/orderController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const OrderRouter = express.Router();

OrderRouter.post("/" , isLoggedIn ,createOrder);
OrderRouter.get("/" , isLoggedIn ,getAllOrders);
OrderRouter.get("/:orderId" , isLoggedIn ,getSingleOrder);
OrderRouter.put("/update/:orderId" , isLoggedIn ,updateOrder);

export default OrderRouter;