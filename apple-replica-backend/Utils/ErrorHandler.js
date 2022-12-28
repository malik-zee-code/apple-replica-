class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // calls contructor of Error
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
