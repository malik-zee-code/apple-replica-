import { StatusCodes } from "http-status-codes";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import Product from "../models/product.js";
import Review from "../models/review.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const GetReviewsOfProduct = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const reviews = await Review.find({});
    res.status(StatusCodes.ACCEPTED).send({ msg: "Success", data: reviews });
  } else {
    throw new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
});

export const AddReview = catchAsyncErrors(async (req, res) => {
  const review = new Review({ ...req.body, author: req.user._id });
  if (review) {
    await review.save();
    const product = await Product.findById(req.params.id);
    product.reviews.push(review);

    await product.save();
    res.status(StatusCodes.ACCEPTED).send({ msg: "Successfully Added review" });
  }
});

export const DeleteReview = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const review = await Review.deleteOne({ _id: req.params.reviewId });
    if (review) {
      res
        .status(StatusCodes.ACCEPTED)
        .send({ msg: "Successfully Deleted review" });
    }
  } else {
    throw new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
  }
});
