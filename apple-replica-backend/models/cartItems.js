import mongoose from "mongoose";

const { Schema } = mongoose;
const CartSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export default new mongoose.model("cartItems", CartSchema);
