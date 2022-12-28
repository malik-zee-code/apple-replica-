import { StatusCodes } from "http-status-codes";
import cloudinaryConf from "../Config/cloudinary.js";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import Product from "../models/product.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

// @route /api/v1/product
// @description Get products
// @route Public

export const getProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.find().populate({
    path: "reviews",
  });

  if (product) {
    res.status(StatusCodes.OK).send({ msg: "Success", data: product });
  }
});

// @route /api/v1/product
// @description Get product By Id
// @route Public

export const getProductById = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.productId).populate({
    path: "reviews",
    populate: { path: "author" },
  });

  if (product) {
    res.status(StatusCodes.OK).send({ msg: "Success", data: product });
  }
});

// @route /api/v1/product
// @description Post product
// @route Private only Admin

export const postProduct = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const { name, price, shippingFees, description, pictures } = req.body;

    let URL = [];

    try {
      for (let p = 0; p < pictures.length; p++) {
        let result = await cloudinaryConf.uploader.upload(pictures[p], {
          folder: "Product Images",
        });
        URL.push(result);
      }
    } catch (error) {
      throw new ErrorHandler(error.message, StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const product = new Product({
      name,
      price,
      shippingFees,
      description,
      pictures: URL.map((l) => l.secure_url),
    });
    if (product) {
      await product.save();
      res.status(StatusCodes.OK).send({ msg: "Success" });
    }
  } else {
    return next(new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED));
  }
});

// @route /api/v1/product/:productid
// @description Update product
// @route Private only Admin

export const UpdateProduct = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const { productId } = req.params;
    const { name, price, shippingFees, description, pictures } = req.body;

    const product = await Product.findOne({ _id: productId });

    if (product) {
      if (pictures) {
        try {
          for (let p = 0; p < pictures.length; p++) {
            let result = await cloudinaryConf.uploader.upload(pictures[p], {
              folder: "Product Images",
            });
            product.pictures.push(result.secure_url);
          }
        } catch (error) {
          throw new ErrorHandler(
            error.message,
            StatusCodes.INTERNAL_SERVER_ERROR
          );
        }
      }

      await product.save({ validateBeforeSave: false });
      const updatedProduct = await Product.updateOne(
        { _id: productId },
        {
          name,
          price,
          shippingFees,
          description,
        }
      );

      if (updatedProduct) {
        res.status(StatusCodes.OK).send({ msg: "Updated Successfully" });
      }
    } else {
      throw new ErrorHandler(
        "Product with that id don't exists",
        StatusCodes.NOT_FOUND
      );
    }
  } else {
    throw new ErrorHandler("Unauthorized", StatusCodes.NOT_FOUND);
  }
});

// @route /api/v1/product/:productid
// @description Delete product
// @route Private only Admin

export const DeleteProduct = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId });

    if (product) {
      const deletedProduct = await Product.deleteOne({ _id: productId });

      if (deletedProduct) {
        res.status(StatusCodes.OK).send({ msg: "Deleted Successfully" });
      }
    } else {
      throw new ErrorHandler(
        "Product with that id don't exists",
        StatusCodes.NOT_FOUND
      );
    }
  } else {
    throw new ErrorHandler("Unauthorized", StatusCodes.NOT_FOUND);
  }
});
