const express = require("express");
const chatController = require("../Controllers/chatController");

const router = express.Router();

router.post("/create", chatController.createChat);
router.get("/search", chatController.searchChats);

router.get("/", chatController.getAllChats);

router.get("/:chatId", chatController.getOneChat);

module.exports = router;
