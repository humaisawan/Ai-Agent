const express = require("express");
const messageController = require("../Controllers/messageController");

const router = express.Router();

router.post("/create/:chatId", messageController.createMessage);

module.exports = router;
