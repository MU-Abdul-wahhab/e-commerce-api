import User from "../model/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import getTokenFromHeader from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    throw new Error("User Already Exist");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });
  const token = generateToken(user._id);

  res.status(201).json({
    status: "Success",
    message: "User created has successfully",
    data: user,
    token,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email,
  });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    const token = generateToken(userFound?._id);
    res.json({
      status: "success",
      message: "Logged in",
      data: userFound,
      token,
    });
  } else {
    throw new Error("Invalid Login Credentials");
  }
});

export const getUserProfile = asyncHandler(async (req, res) => {

  const user = await User.findById(req.userAuthId).populate("orders");


  res.json({
    message: "Welcome to Profile Page",
    user
  });
});

export const updateShippingAddress = asyncHandler(async (req, res) => {
  const { firstName, lastName, address, city, postalCode, province, phone } =
    req.body;
  const user = await User.findByIdAndUpdate(
    req.userAuthId,
    {
      shippingAddress: {
        firstName,
        lastName,
        address,
        city,
        postalCode,
        province,
        phone,
      },
      hasShippingAddress: true,
    },
    {
      new: true,
    }
  );

  res.json({
    status : "success",
    message : "Shipping Address Updated Succeesfully",
    user,
  })
});
