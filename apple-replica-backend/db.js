import mongoose from "mongoose";

export const ConnectDB = () => {
  mongoose
    .connect(`${process.env.MONGO_URL}`)
    .then(() => console.log("Database Connected"))
    .catch((err) => console.log(err.message));
};
