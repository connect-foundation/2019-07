const express = require("express");
const {
  isRoomExist,
  isRoomNumberValid,
  isValidNickname,
  isNicknameOverlap
} = require("../../middleware/validations");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    isError: true,
    message: "방 번호를 입력하세요."
  });
});

/**
 * @api {get} /room/:roomNumber 유효한 방인지 확인 요청
 */
router.get("/:roomNumber", isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isSuccess: true
  });
});

router.get("/:roomNumber/name", isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isError: true,
    message: "닉네임을 입력하세요."
  });
});

/**
 * @api {get} /room/:roomNumber/:nickname 방에서 유효한 닉네임인지 확인 요청
 */
router.get(
  "/:roomNumber/name/:nickname",
  isRoomNumberValid,
  isRoomExist,
  isValidNickname,
  isNicknameOverlap,
  (req, res) => {
    res.json({
      isSuccess: true
    });
  }
);

module.exports = router;
