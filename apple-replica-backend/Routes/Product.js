import passport from "passport";
import {
  postProduct,
  getProduct,
  UpdateProduct,
  DeleteProduct,
  getProductById,
} from "../Controller/Product.js";
import { ValidateProduct } from "../Middleware/product.js";

import express from "express";
const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  ValidateProduct,
  postProduct
);

router.get("/", getProduct);

router
  .route("/:productId")
  .get(getProductById)
  .patch(passport.authenticate("jwt", { session: false }), UpdateProduct)
  .delete(passport.authenticate("jwt", { session: false }), DeleteProduct);

export default router;
