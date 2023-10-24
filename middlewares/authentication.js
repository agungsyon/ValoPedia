async function authentication(req, res, next) {
  try {
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
