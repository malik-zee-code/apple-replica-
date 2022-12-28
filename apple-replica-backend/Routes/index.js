import express from "express";
import UserRoute from "./User.js";
import FaqRoute from "./Faq.js";
import CartItemRoute from "./CartItem.js";
import ProductRoute from "./Product.js";
import ReviewRoute from "./Review.js";
import OrderRoute from "./Order.js";
import UploadRoute from "./UploadImage.js";
import ImageRoute from "./Image.js";

const router = express.Router();

router.use("/user", UserRoute);
router.use("/faq", FaqRoute);
router.use("/cartItem", CartItemRoute);
router.use("/product/:id/review", ReviewRoute);
router.use("/product", ProductRoute);
router.use("/order", OrderRoute);
router.use("/upload", UploadRoute);
router.use("/file", ImageRoute);

export default router;
