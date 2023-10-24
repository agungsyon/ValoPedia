function errorHandling(error, req, res, next) {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      status = 400;
      message = error.errors[0].message;
      break;
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid token";
      break;
  }
  res.status(status).json({ message });
}

module.exports = errorHandling;
