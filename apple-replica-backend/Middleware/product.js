import joi from "joi";
import catchAsyncErrors from "./catchAsyncErrors.js";

export const ValidateProduct = catchAsyncErrors(async (req, res, next) => {
  const productSchema = joi.object({
    name: joi.string().required(),
    description: joi.string().required(),
    pictures: joi.array(),
    price: joi.number().required(),
    shippingFees: joi.number().required(),
  });

  const product = productSchema.validate(req.body);

  if (product) {
    next();
  }
});
