const express = require("express");
const ValorantController = require("../controllers/valorantController");
const router = express.Router();

router.get("/agents", ValorantController.fetchAgents);
router.get("/bundles", ValorantController.fetchBundles);

module.exports = router;
