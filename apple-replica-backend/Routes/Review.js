import passport from "passport";
import {
  AddReview,
  DeleteReview,
  GetReviewsOfProduct,
} from "../Controller/Review.js";
import express from "express";
const router = express.Router({ mergeParams: true });

export default router;
