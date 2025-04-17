import Brand from "../model/Brand.js";
import Category from "../model/Category.js";
import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, price, totalQty, brand } =
    req.body;

  const productExist = await Product.findOne({ name });

  if (productExist) throw new Error("Product Already Exists");

  const brandFound = await Brand.findOne({
    name: brand,
  });

  if (!brandFound) throw new Error("Invalid Brand");

  const categoryFound = await Category.findOne({
    name: category,
  });

  if (!categoryFound) throw new Error("Invalid Category");

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user: req.userAuthId,
    price,
    totalQty,
    brand,
  });

  categoryFound.products.push(product._id);
  await categoryFound.save();

  brandFound.products.push(product._id);
  await brandFound.save();

  res.json({
    status: "success",
    message: "Product Created Successfully",
    product,
  });
});

export const getAllproducts = asyncHandler(async (req, res) => {
  let productQueryObj = {};

  if (req.query.name) {
    productQueryObj.name = { $regex: req.query.name, $options: "i" };
  }

  if (req.query.brand) {
    productQueryObj.brand = { $regex: req.query.brand, $options: "i" };
  }

  if (req.query.category) {
    productQueryObj.category = { $regex: req.query.category, $options: "i" };
  }

  if (req.query.colour) {
    productQueryObj.colours = { $regex: req.query.colour, $options: "i" };
  }

  if (req.query.sizes) {
    productQueryObj.sizes = { $regex: req.query.sizes, $options: "i" };
  }

  if (req.query.price) {
    const priceRange = req.query.price.split("-");
    productQueryObj.price = { $gte: priceRange[0], $lte: priceRange[1] };
  }

  const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
  const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 1;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const total = await Product.countDocuments(productQueryObj);

  const pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  const products = await Product.find(productQueryObj)
    .skip(startIndex)
    .limit(limit)
    .populate("reviews");

  res.json({
    status: "Success",
    total,
    results: products.length,
    pagination,
    message: "Product Fetched",
    products,
  });
});

export const getSingleProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id).populate("reviews");

  if (!product) throw new Error("Product Not Found");

  res.json({
    status: "Success",
    message: "Product Fetched Successfully",
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    sizes,
    colors,
    user,
    price,
    totalQty,
    brand,
  } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      category,
      sizes,
      colors,
      user,
      price,
      totalQty,
      brand,
    },
    {
      new: true,
    }
  );

  res.json({
    status: "success",
    message: "Product Updated Successfully",
    product,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product Deleted Successfully",
  });
});
