const express = require("express");
const router = express.Router();
const errorHandling = require("../middlewares/errorHandling");
const userRouter = require("./user");
const valopediaRouter = require("./valopedia");

router.use(userRouter);
router.use(valopediaRouter);

router.use(errorHandling);

module.exports = router;
