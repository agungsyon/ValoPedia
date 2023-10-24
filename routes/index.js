const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const errorHandling = require("../middlewares/errorHandling");

router.use(userRouter);

router.use(errorHandling);

module.exports = router;
