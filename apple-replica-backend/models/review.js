import mongoose from "mongoose";

const { Schema } = mongoose;

const reviewSchema = Schema({
  rating: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

export default new mongoose.model("review", reviewSchema);
