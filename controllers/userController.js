import User from "../model/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

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

  res.status(201).json({
    status: "Success",
    message: "User created has successfully",
    data: user,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const userFound = await User.findOne({
    email,
  });

  if (userFound && (await bcrypt.compare(password, userFound?.password))) {
    res.json({
      status: "success",
      message: "Logged in",
      data: userFound,
    });
  } else {
    throw new Error("Invalid Login Credentials");
  }
});
