import Category from "../model/Category.js";
import asyncHandler from "express-async-handler";

export const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const imgPath = req.files.map((file) => file.path);
  const categoryFound = await Category.findOne({ name });

  console.log(imgPath);

  if (categoryFound) throw new Error("Category ALready Exists");

  const category = await Category.create({
    name,
    user: req.userAuthId,
    image: imgPath
  });

  res.json({
    status: "success",
    message: "Category Created Successfully",
    category,
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  const category = await Category.find();

  res.json({
    status: "success",
    message: "Category Fetched Successfully",
    category,
  });
});

export const getSingleCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  res.json({
    status: "success",
    message: "Category Fetched Successfully",
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByIdAndUpdate(
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
    message: "category Updated Successfully",
    category,
  });
});

export const deleteCategory = asyncHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product Deleted Successfully",
  });
});
