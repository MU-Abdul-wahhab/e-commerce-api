import Review from "../model/Review.js";
import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createReview = asyncHandler(async (req, res) => {
  const { message, rating } = req.body;
  const { productId } = req.params;

  const productFound = await Product.findById(productId).populate("reviews");

  if (!productFound) throw new Error("NO product Found with provided ID");

  const hasReviewed = productFound.reviews.find((review) => {
    return review.user.toString() === req.userAuthId.toString();
  });

  if(hasReviewed) throw new Error("You Already Have Benn Reviewed This Product");

  console.log(hasReviewed);

  const review = await Review.create({
    user: req.userAuthId,
    product: productFound?._id,
    message,
    rating,
  });

  productFound.reviews.push(review?._id);

  await productFound.save();

  res.json({
    status: "success",
    message: "Review Created Successfully",
    review,
  });
});
