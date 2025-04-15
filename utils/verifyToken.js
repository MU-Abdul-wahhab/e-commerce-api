import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};
