import express from "express";
import passport from "passport";
import catchAsyncErrors from "../Middleware/catchAsyncErrors.js";
import User from "../models/user.js";
import cloudinary from "../Config/cloudinary.js";

const router = express.Router();

export default router;
