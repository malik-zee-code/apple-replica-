import mongoose from "mongoose";

const faqSchema = mongoose.Schema({
  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },
});

export default new mongoose.model("faq", faqSchema);
