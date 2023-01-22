const router = require("express").Router();
const {
  initiate,
  postMessage,
  getConversationByRoomId,
  getRoomsByUserId,
  verifyIfRoomExists,
} = require("../controllers/chatRoom");

router.post("/initiate", initiate);
router.post("/postMessage/:roomId", postMessage);
router.get("/getConversationByRoomId/:roomId", getConversationByRoomId);
router.get("/getRoomsByUserId/:id", getRoomsByUserId);
router.post("/verifyIfRoomExists", verifyIfRoomExists);

module.exports = router;
