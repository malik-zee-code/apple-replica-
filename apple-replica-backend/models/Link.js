import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  url: String,
  status: { type: String, default: "pending", enum: ["pending", "live"] },
  generatedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },
});

export default new mongoose.model("link", LinkSchema);
