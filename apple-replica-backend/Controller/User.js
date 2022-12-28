import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { hashSync, compare } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import ErrorHandler from "../Utils/ErrorHandler.js";
import Link from "../models/Link.js";

const { sign } = jsonwebtoken;

export const GenerateLink = catchAsyncErrors(async (req, res) => {
  const url = req.user.username + "/" + req.user._id;
  const link = new Link({
    url,
    generatedBy: req.user._id,
  });
  await link.save();
  res.send(link);
});

export const getAllLinks = catchAsyncErrors(async (req, res) => {
  const link = await Link.find({}).populate("generatedBy");
  res.send(link);
});

export const findLinkByUserId = catchAsyncErrors(async (req, res) => {
  const id = req.params.userId;

  const link = await Link.findOne({ generatedBy: id });

  if (!link) {
    throw new ErrorHandler("Link Doesn't exist", StatusCodes.NO_CONTENT);
  }

  res.send(link);
});

export const ChangeLinkStatus = catchAsyncErrors(async (req, res) => {
  if (req.user.userType !== "Admin") {
    throw new ErrorHandler("Unauthorized", 401);
  }
  const link = await Link.findByIdAndUpdate(req.params.linkId, req.body);

  if (!link) {
    throw new ErrorHandler("Link doesn't exist ", 400);
  }

  res.send({ msg: "Successfully changed status", data: link });
});

export const CreateUser = catchAsyncErrors(async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
    userType: req.body.userType,
    refferedBy: req.body.refferedBy,
    percentage: 1,
  });
  if (user) {
    const payload = {
      _id: user._id,
      username: req.body.username,
      password: user.password,
      userType: user.userType,
      refferedBy: user.refferedBy,
    };
    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await user.save();
    return res.status(StatusCodes.CREATED).send({
      msg: "Successfully Created!",
      data: {
        user: {
          username: user.username,
          _id: user._id,
          userType: user.userType,
          wallet: user.wallet,
          refferedBy: user.refferedBy,
          percentage: user.percentage,
        },
        token: token,
      },
    });
  }
});

export const inviteCreateUser = catchAsyncErrors(async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: hashSync(req.body.password, 10),
    userType: req.body.userType,
    refferedBy: req.body.refferedBy,
  });
  if (user) {
    const payload = {
      _id: user._id,
      username: req.body.username,
      password: user.password,
      userType: user.userType,
      refferedBy: user.refferedBy,
    };
    const token = sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    await user.save();
    return res.status(StatusCodes.CREATED).send({
      msg: "Successfully Created!",
      data: {
        user: {
          username: user.username,
          _id: user._id,
          userType: user.userType,
          wallet: user.wallet,
        },
        token: token,
      },
    });
  }
});

export const LoginUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username }).populate({
    path: "refferedBy",
  });

  if (user) {
    const isLoggedin = await compare(req.body.password, user.password);
    if (isLoggedin) {
      const payload = {
        _id: user._id,
        username: user.username,
        password: user.password,
        userType: user.userType,
        refferedBy: user.refferedBy,
        percentage: user.percentage,
      };
      const token = sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      console.log("refferedBy:", user.refferedBy);
      return res.status(StatusCodes.OK).send({
        msg: "Successfully Logged In",
        data: {
          token: token,
          user: {
            username: user.username,
            _id: user._id,
            wallet: user.wallet,
            userType: user.userType,
            refferedBy: user.refferedBy,
            percentage: user.percentage,
          },
        },
      });
    } else {
      return next(
        new ErrorHandler(
          "Incorrect Username or Password!",
          StatusCodes.BAD_REQUEST
        )
      );
    }
  }
  return next(new ErrorHandler("User not found", StatusCodes.NOT_FOUND));
});

export const getUserbyToken = catchAsyncErrors(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id)
    .populate({
      path: "cartItems",
      populate: { path: "product" },
    })
    .populate("refferedBy");
  const { username, userType, cartItems, wallet, refferedBy } = user;
  res.status(StatusCodes.OK).send({
    msg: "Success",
    data: { user: { userType, username, _id, cartItems, wallet, refferedBy } },
  });
});

export const getUserWallet = catchAsyncErrors(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    const wallet = user.wallet;
    res.status(StatusCodes.OK).send({ data: wallet, msg: "success" });
    return;
  }
  res.status(StatusCodes.OK).send({ data: wallet, msg: "success" });
});

export const getAllUserWallet = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const user = await User.find();

    res.status(StatusCodes.OK).send({ data: user, msg: "success" });
    return;
  }

  res.status(StatusCodes.UNAUTHORIZED).send({ error: "Unauthorized" });
});

export const updateUserWallet = catchAsyncErrors(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    wallet: { balance: req.body.wallet },
  });

  res.status(StatusCodes.OK).send({ data: user, msg: "success" });
  return;
});

export const updateAdminWallet = catchAsyncErrors(async (req, res) => {
  const user = await User.findOne({ userType: "Admin" });

  user.wallet.balance = user.wallet.balance + req.body.wallet;

  console.log(user.wallet.balance);

  await user.save();
  res.status(StatusCodes.OK).send({ data: user, msg: "success" });
  return;
});

export const ChangePercentage = catchAsyncErrors(async (req, res) => {
  if (req.user.userType !== "Admin") {
    throw new ErrorHandler("Unauthorized", 401);
  }
  const user = await User.findByIdAndUpdate(req.params.userId, req.body);

  if (!user) {
    throw new ErrorHandler("User doesn't exist ", 400);
  }

  res.send({ msg: "Successfully changed status", data: user });
});

export const getAllUserPercentages = catchAsyncErrors(async (req, res) => {
  if (req.user.userType === "Admin") {
    const user = await User.find();

    res.status(StatusCodes.OK).send({ data: user, msg: "success" });
    return;
  }

  res.status(StatusCodes.UNAUTHORIZED).send({ error: "Unauthorized" });
});
