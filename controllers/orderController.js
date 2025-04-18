import Order from "../model/Order.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Stripe from "stripe";
import Coupen from "../model/Coupen.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_KEY);

export const createOrder = asyncHandler(async (req, res) => {
  const { coupen } = req?.query;

  let coupenFound = null;
  let discount = 0;

  // Check if coupen exists before trying to process it
  if (coupen) {
    coupenFound = await Coupen.findOne({
      code: coupen.toUpperCase(),
    });

    if (!coupenFound) throw new Error("Invalid Coupen");

    if (coupenFound.isExpired) throw new Error("Coupen Expired");

    discount = coupenFound.discount / 100;
  }

  const { orderItems, shippingAddress, totalPrice } = req.body;

  const user = await User.findById(req.userAuthId);

  if (!user.hasShippingAddress)
    throw new Error("Please Provide a shipping address");

  if (orderItems.length <= 0) throw new Error("No Order Items Found");

  const order = await Order.create({
    user: user._id,
    orderItems,
    shippingAddress,
    totalPrice: totalPrice - totalPrice * discount,
  });

  console.log(order);

  const products = await Product.find({ _id: { $in: orderItems } });

  orderItems.map(async (order) => {
    const product = products.find(
      (product) => product._id.toString() === order._id.toString()
    );

    if (product) product.totalSold += order.totalQtyBuying;
    await product.save();
  });

  user.orders.push(order._id);
  await user.save();

  const convertedData = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: item?.price * 100,
      },
      quantity: item?.totalQtyBuying,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedData,
    mode: "payment",
    metadata: {
      order_id: order?._id.toString(),
    },
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/success",
  });

  res.send({ url: session.url });
});

export const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Order.find();

  res.json({
    status: "success",
    message: "Orders fetched success",
    order,
  });
});

export const getSingleOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.orderId);

  res.json({
    status: "success",
    message: "Orders fetched success",
    order,
  });
});

export const updateOrder = asyncHandler(async (req, res) => {
  const id = req.params.orderId;

  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    message: "order updated",
    updatedOrder,
  });
});

export const orderStats = asyncHandler(async (req, res) => {
  const orderStats = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maximumSale: {
          $max: "$totalPrice",
        },
        avgSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);

  const date = new Date();
  const tdy = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const saleTdy = await Order.aggregate([
    {
      $match: {
        createdAt : {
          $gte : tdy
        }
      },
    },
   {
    $group : {
      _id : null,
      totalSales : {
        $sum : "$totalPrice"
      }
    }
   }
  ]);

  console.log(tdy);
  res.json({
    status: "Success",
    message: "Sum Of Order",
    orderStats,
    saleTdy
  });
});
