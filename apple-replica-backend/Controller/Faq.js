import { StatusCodes } from "http-status-codes";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import Faq from "../models/faq.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getFAQ = catchAsyncErrors(async (req, res) => {
  const faq = await Faq.find({});
  if (faq) {
    return res.status(StatusCodes.OK).send({ msg: "Success", data: faq });
  }
  res.status(400).send({ error: "Something went wrong" });
});

export const CreateFAQ = catchAsyncErrors(async (req, res) => {
  const { userType } = req.user;

  if (userType !== "Admin") {
    next(new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED));
  }

  const faq = new Faq({
    question: req.body.question,
    answer: req.body.answer,
  });

  if (faq) {
    await faq.save();
    return res
      .status(StatusCodes.OK)
      .send({ msg: "Successfully Created FAQ", data: { faq } });
  }

  next(new ErrorHandler("Something went Wrong!", StatusCodes.BAD_REQUEST));
});

export const DeleteAllFAQ = catchAsyncErrors(async (req, res, next) => {
  const { userType } = req.user;

  if (userType !== "Admin") {
    next(new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED));
  }

  const faq = await Faq.deleteMany({});

  if (faq) {
    return res.status(StatusCodes.OK).send({ msg: "Success!" });
  } else {
    next(new ErrorHandler("Something went Wrong!", StatusCodes.BAD_REQUEST));
  }
});
