import { StatusCodes } from "http-status-codes";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import User from "../models/user.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Order from "../models/order.js";

export const getAllUserOrders = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const user = await User.find();

    if (user) {
      let orders = [];
      for (let s of user) {
        if (s.order.length > 0) {
          orders.push(s.order);
        }
      }
      res.status(StatusCodes.OK).send({ msg: "success", data: orders });
      return;
    }
    res.status(StatusCodes.NOT_FOUND).send({ error: "No user found" });
    return;
  }
  throw new ErrorHandler("Unauthorized", StatusCodes.UNAUTHORIZED);
});

export const getUserOrders = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "order",
    populate: {
      path: "product",
    },
  });

  console.log(user);

  if (user) {
    const orders = user.order;
    res.status(StatusCodes.OK).send({ msg: "success", data: orders });
    return;
  }

  res.status(StatusCodes.NOT_FOUND).send({ error: "No user found" });
});

export const AddUserOrders = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  console.log(req.body.orders);

  if (user) {
    const order = await Order.insertMany(req.body.orders);
    console.log(order);

    user.order = [...user.order, ...order];

    console.log(user.order);
    const Admin = await User.findOne({ userType: "Admin" });

    if (user.userType === "Admin") {
      await user.save();
    } else {
      Admin.order = [...Admin.order, ...order];
      await user.save();
      await Admin.save();
    }

    res.status(StatusCodes.OK).send({ msg: "success", data: user.order });
    return;
  }
  res.status(StatusCodes.NOT_FOUND).send({ error: "No user found" });
});

export const updateOrderStatus = catchAsyncErrors(async (req, res) => {
  const Admin = await User.findById(req.user.id);

  if (Admin.userType === "Admin") {
    const order = await Order.findByIdAndUpdate(req.params.id, {
      status: "delivered",
    });
    // const user = await User.find({ "order._id": req.params.id });

    // console.log(user);

    // const newArr = user.order.map((obj) => {
    //   if (obj._id == req.params.id) {
    //     return { ...obj, status: req.body.status };
    //   }

    //   return obj;
    // });

    // user.order = newArr;

    // await user.save();

    res.status(StatusCodes.OK).send({ msg: "success", data: order });
    return;
  }
  res.status(StatusCodes.NOT_FOUND).send({ error: "No user found" });
});
