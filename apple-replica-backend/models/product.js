import mongoose from "mongoose";
import Review from "./review.js";

const { Schema } = mongoose;
const productSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [
    {
      type: String,
    },
  ],
  price: {
    type: Number,
    required: true,
  },
  shippingFees: {
    type: Number,
    required: true,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "review",
    },
  ],
});

productSchema.post("findOneAndDelete", async (doc) => {
  // for deleting reviews in the review collection when a Product is deleted it then
  // also deletes the reviews in that product and in the reviews collecion
  if (doc) {
    await Review.deleteMany({ _id: { $in: doc.reviews } });
    console.log("Deleted");
  }
});

export default new mongoose.model("product", productSchema);
