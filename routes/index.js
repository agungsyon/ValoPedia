const express = require("express");
const router = express.Router();
const errorHandling = require("../middlewares/errorHandling");
const userRouter = require("./user");
const valorantRouter = require("./valorant");

router.use(userRouter);
router.use(valorantRouter);

router.use(errorHandling);

module.exports = router;
