const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middlewares/authentication");
const router = express.Router();


router.get("/agents", Controller.fetchAgents);
router.get("/bundles", Controller.fetchBundles);
router.use(authentication)
router.post("/generate-midtrans-token", Controller.midtransToken);
router.post("/inventories", Controller.postInventory);
router.get("/inventories", Controller.fetchInventory);

module.exports = router;
