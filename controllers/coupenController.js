import Coupen from "../model/Coupen.js";
import asyncHandler from "express-async-handler";

export const createCoupen = asyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;

  const coupenExist = await Coupen.findOne({
    code,
  });

  if (coupenExist) throw new Error("Coupen Already Exists");

  if (isNaN(discount)) throw new Error("Discount Value Must Be a Number");

  const coupen = await Coupen.create({
    code: code?.toUpperCase(),
    startDate,
    endDate,
    discount,
    user: req.userAuthId,
  });

  res.json({
    status: "Success",
    message: "Coupen Created Successfully",
    coupen,
  });
});

export const getAllCoupen = asyncHandler(async (req, res) => {
  const coupen = await Coupen.find();

  res.json({
    status: "Success",
    message: "Fetched",
    coupen,
  });
});

export const getSingleCoupen = asyncHandler(async (req, res) => {
  const { coupenId } = req.params;

  const coupen = await Coupen.findById(coupenId);

  res.json({
    status: "success",
    message: "Fetched done",
    coupen,
  });
});

export const updateCoupen = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const coupenId = req.params.coupenId;

  const coupen = await Coupen.findByIdAndUpdate(
    coupenId,
    {
      code: code.toUpperCase(),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.json({
    status: "success",
    message: "Updated done",
    coupen,
  });
});

export const deleteeCoupen = asyncHandler(async (req, res) => {
 
  const coupenId = req.params.coupenId;

   await Coupen.findByIdAndDelete(coupenId);

  res.json({
    status: "success",
    message: "Deleted done",
 
  });
});
