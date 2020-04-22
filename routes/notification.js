const express = require("express");
const notificationController = require("../controllers/notification");

const router = express.Router();

router.get("/notifications", notificationController.getNotifications);

module.exports = router;
