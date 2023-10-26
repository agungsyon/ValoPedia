const { comparePassword } = require("../helpers/bcrypt");
const { signToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.create({ email, password });

      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) {
        throw { status: 400, message: "Email is required" };
      }
      if (!password) {
        throw { status: 400, message: "Password is required" };
      }

      const user = await User.findOne({ where: { email } });
      if (!user || !comparePassword(password, user.password)) {
        throw { status: 401, message: "Invalid email/password" };
      }

      const access_token = signToken({ id: user.id });
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      console.log(req.headers.google_token);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: process.env.G_CLIENT,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "password_google",
        },
        hooks: false,
      });

      let status = 200;
      if (created) {
        status = 201;
      }

      const access_token = signToken({ id: user.id });

      res.status(status).json({
        access_token,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
