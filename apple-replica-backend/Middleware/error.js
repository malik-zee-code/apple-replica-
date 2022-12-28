import { StatusCodes } from "http-status-codes";
import ErrorHandler from "../Utils/ErrorHandler.js";

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  err.message = err.message || "INTERNAL SERVER ERROR";

  if (err.name === "CastError") {
    err.message = `Resourse not found. Invalid ${err.path}`;
    err = new ErrorHandler(err.message, 400);
  }

  return res.status(err.statusCode).json({ error: err.message });
};
