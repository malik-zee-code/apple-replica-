import passport from "passport";
import {
  postCartItems,
  updatePaticularCartProduct,
  getCartItems,
  DeletePaticularCartProduct,
  deleteCartItemById,
  DeleteAllCartProductfromUser,
} from "../Controller/CartItem.js";

import express from "express";
const router = express.Router();

router
  .route("/")
  .get(passport.authenticate("jwt", { session: false }), getCartItems)
  .post(passport.authenticate("jwt", { session: false }), postCartItems);
router.delete(
  "/cart/:cartId",
  passport.authenticate("jwt", { session: false }),
  deleteCartItemById
);

router.delete(
  passport.authenticate("jwt", { session: false }),
  DeletePaticularCartProduct
);

export default router;
