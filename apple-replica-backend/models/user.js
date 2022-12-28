import { default as mongoose } from "mongoose";

const { Schema } = mongoose;

const walletSchema = Schema({
  balance: {
    type: Number,
    default: 0,
    min: [0, "Your Balance is Zero"],
  },
  source: {
    type: String,
  },
});

const UserSchema = Schema({
  userType: {
    type: String,
    enum: ["Admin", "User"],
    default: "User",
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  wallet: walletSchema,

  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
  ],

  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cartItems",
    },
  ],

  refferedBy: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "user",
  },

  percentage: { type: Number, default: 1 },
  logo: {
    type: String,
  },

  backgroundImage: [{ type: String }],
});

export default new mongoose.model("user", UserSchema);
