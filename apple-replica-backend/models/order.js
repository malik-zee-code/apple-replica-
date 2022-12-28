import { default as mongoose } from "mongoose";

const { Schema } = mongoose;

const orderSchema = Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },

  price: {
    type: Schema.Types.Number,
  },

  quantity: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "delivered"],
    default: "pending",
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

export default new mongoose.model("order", orderSchema);
