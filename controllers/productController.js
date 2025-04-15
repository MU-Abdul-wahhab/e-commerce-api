import Product from "../model/Product.js";
import asyncHandler from "express-async-handler";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, description, category, sizes, colors, user, price, totalQty,brand } =
    req.body;

  const productExist = await Product.findOne({ name });

  if (productExist) throw new Error("Product Already Exists");

  const product = await Product.create({
    name,
    description,
    category,
    sizes,
    colors,
    user : req.userAuthId,
    price,
    totalQty,
    brand
  });

  res.json({
    status : "success",
    message : "Product Created Successfully",
    product
  })
});

export const getAllproducts = asyncHandler( async (req,res) =>{

    const product = await Product.find();
    res.json({
        status : "Success",
        product
    })

});
