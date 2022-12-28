import express from "express";
import passport from "passport";
import {
  AddUserOrders,
  getAllUserOrders,
  getUserOrders,
  updateOrderStatus,
} from "../Controller/Order.js";

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getUserOrders
); // get All paticular user Orders (logged in user)
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  AddUserOrders
); // Add order to user Orders (Logged In user) also save it to admin's field order: ;
router.post(
  "/getallOrders",
  passport.authenticate("jwt", { session: false }),
  getAllUserOrders
); // get all users orders

router.post(
  "/:id/status",
  passport.authenticate("jwt", { session: false }),
  updateOrderStatus
); // get all users orders

export default router;
