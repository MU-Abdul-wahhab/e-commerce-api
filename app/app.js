import express from "express";
import dbConnect from "../config/dbConnect.js";
import dotenv from "dotenv";
import userRouter from "../routes/usersRoutes.js";
import {
  globalErrorHandler,
  notFound,
} from "../middlewares/globalErrorHAndler.js";
import productRouter from "../routes/productRoutes.js";
import categoryRouter from "../routes/CategoryRoutes.js";
import BrandRouter from "../routes/BrandRouter.js";
import ColourRouter from "../routes/ColourRouter.js";
import ReviewRouter from "../routes/ReviewRouter.js";
import orderRouter from "../routes/OrderRouter.js";
import Order from "../model/Order.js";
import CoupenRouter from "../routes/CoupenRouter.js";

dotenv.config();
dbConnect();

const app = express();

app.use(express.json());

app.post(
  "/webhook",
  express.json({ type: "application/json" }),
  async (request, response) => {
    const event = request.body;

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        const orderId = session.metadata.order_id;
        const paymentStatus = session.payment_status;
        const paymentMode = session.mode;
        const totalAmount = session.amount_total;
        const currency = session.currency;

        const order = await Order.findByIdAndUpdate(
          orderId,
          {
            totalPrice: totalAmount / 100,
            currency,
            paymentMethod: paymentMode,
            paymentStatus,
          },
          {
            new: true,
          }
        );

        break;
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object;

        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case "payment_method.attached":
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    response.json({ received: true });
  }
);

app.use("/api/v1/users/", userRouter);
app.use("/api/v1/products/", productRouter);
app.use("/api/v1/categories/", categoryRouter);
app.use("/api/v1/brands/", BrandRouter);
app.use("/api/v1/colours/", ColourRouter);
app.use("/api/v1/reviews/", ReviewRouter);
app.use("/api/v1/orders/", orderRouter);
app.use("/api/v1/coupens" , CoupenRouter);

app.use(notFound);
app.use(globalErrorHandler);
export default app;
