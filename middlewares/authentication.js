const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    const payload = verifyToken(access_token);

    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { status: 401, message: "Invalid token" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;
