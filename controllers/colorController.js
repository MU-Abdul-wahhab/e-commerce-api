import Colour from "../model/Colour.js";
import asyncHandler from "express-async-handler";

export const createColour = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const colourFound = await Colour.findOne({ name });

  if (colourFound) throw new Error("colour ALready Exists");

  const colour = await Colour.create({
    name,
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "colour Created Successfully",
    colour,
  });
});

export const getAllColour = asyncHandler(async (req, res) => {
  const colour = await Colour.find();

  res.json({
    status: "success",
    message: "colour Fetched Successfully",
    colour,
  });
});

export const getSingleColour = asyncHandler(async (req, res) => {
  const colour = await Colour.findById(req.params.id);

  res.json({
    status: "success",
    message: "colour Fetched Successfully",
    colour,
  });
});

export const updateColour = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const colour = await Colour.findByIdAndUpdate(
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
    message: "colour Updated Successfully",
    colour,
  });
});

export const deleteColour = asyncHandler(async (req, res) => {
  await Colour.findByIdAndDelete(req.params.id);

  res.json({
    status: "success",
    message: "Product Deleted Successfully",
  });
});
