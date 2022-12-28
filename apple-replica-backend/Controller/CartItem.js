import { StatusCodes } from "http-status-codes";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import CartItems from "../models/cartItems.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";

export const getCartItems = catchAsyncErrors(async (req, res, next) => {
  const { _id } = req.user;

  const cartItem = await CartItems.find({ user: _id }).populate("product");

  if (cartItem) {
    res.status(StatusCodes.OK).send({ msg: "Success!", data: cartItem });
  } else {
    next(new ErrorHandler("Something went wrong", StatusCodes.NOT_FOUND));
  }
});

export const deleteCartItemById = catchAsyncErrors(async (req, res, next) => {
  const { cartId } = req.params;
  const cartItem = await CartItems.deleteOne({ _id: cartId });
  if (cartItem) {
    res.status(StatusCodes.OK).send({ msg: "Success!", data: cartItem });
  } else {
    next(new ErrorHandler("Something went wrong", StatusCodes.NOT_FOUND));
  }
});

export const postCartItems = catchAsyncErrors(async (req, res) => {
  const { quantity, product_id } = req.body;
  const { _id } = req.user;

  const cartItem = new CartItems({
    quantity,
    product: product_id,
    user: _id,
  });
  const user = await User.findById(_id).populate("cartItems");

  user.cartItems.push(cartItem);

  await cartItem.save();
  await user.save();

  const cartItems = await CartItems.find({ user: req.user._id }).populate(
    "product"
  );

  res.status(StatusCodes.OK).send({
    msg: "Success!",
    data: cartItems,
  });
});

export const updatePaticularCartProduct = catchAsyncErrors(async (req, res) => {
  const { quantity } = req.body;
  const cartProduct = await CartItems.findOne({
    product: req.params.productId,
  });

  if (cartProduct) {
    const updatedProduct = await CartItems.updateOne(
      { _id: cartProduct._id },
      {
        quantity: +cartProduct.quantity + +quantity,
      }
    );
    // getting all the cart products of the user
    const cartItems = await CartItems.find({ user: req.user._id }).populate(
      "product"
    );
    // --
    if (updatedProduct) {
      res.status(StatusCodes.OK).send({ msg: "Success", data: cartItems });
    }
  }
});

export const DeletePaticularCartProduct = catchAsyncErrors(
  async (req, res, next) => {
    const product = await CartItems.deleteOne({
      product: req.params.productId,
    });

    const cartItems = await CartItems.find({ user: req.user._id }).populate(
      "product"
    );

    console.log(product);
    if (product) {
      res
        .status(StatusCodes.OK)
        .send({ msg: "Successfully Deleted!", data: cartItems });
    } else {
      next(new ErrorHandler("Something went wrong", StatusCodes.BAD_REQUEST));
    }
  }
);

export const DeleteAllCartProductfromUser = catchAsyncErrors(
  async (req, res, next) => {
    const cart = await CartItems.deleteMany({ user: req.user._id });

    if (cart) {
      res
        .status(StatusCodes.OK)
        .send({ msg: "Successfully Deleted!", data: [] });
    } else {
      next(new ErrorHandler("Something went wrong", StatusCodes.BAD_REQUEST));
    }
  }
);
