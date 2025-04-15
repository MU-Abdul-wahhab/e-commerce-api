import Brand from "../model/Brand.js";
import asyncHandler from "express-async-handler";

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brandFound = await Brand.findOne({ name });

  if (brandFound) throw new Error("brand ALready Exists");

  const brand = await Brand.create({
    name,
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "brand Created Successfully",
    brand,
  });
});

export const getAllBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.find();

  res.json({
    status: "success",
    message: "brand Fetched Successfully",
    brand,
  });
});

export const getSingleBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  res.json({
    status: "success",
    message: "brand Fetched Successfully",
    brand,
  });
});

export const updateBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    {
      name,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "brand Updated Successfully",
    brand,
  });
});

export const deleteBrand = asyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product Deleted Successfully",
  });
});
