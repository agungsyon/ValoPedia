const express = require("express");
const ValorantController = require("../controllers/valorantController");
const authentication = require("../middlewares/authentication");
const router = express.Router();


router.get("/agents", ValorantController.fetchAgents);
router.get("/bundles", ValorantController.fetchBundles);
router.use(authentication)
router.post("/generate-midtrans-token", ValorantController.midtransToken);
router.post("/inventories", ValorantController.postInventory);

module.exports = router;
