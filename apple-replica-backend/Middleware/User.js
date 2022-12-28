import { StatusCodes } from "http-status-codes";
import User from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";

export const validateUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    next();
  } else {
    return next(new ErrorHandler("User Already Exists!", StatusCodes.CONFLICT));
  }
});
