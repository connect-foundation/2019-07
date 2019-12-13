const express = require('express');
const {
  isRoomExist,
  isRoomNumberValid,
  isValidNickname,
  isNicknameOverlap,
} = require('../../middleware/validations');

const router = express.Router();
const dbManager = require('../../models/database/dbManager');

router.get('/', (req, res) => {
  res.json({
    isError: true,
    message: '방 번호를 입력하세요.',
  });
});

/**
 * @api {get} /room/:roomNumber 유효한 방인지 확인 요청
 * @apiName checkValidRoomNumber
 * @apiGroup room
 *
 * @apiParam {String} roomNumber 방의 고유한 6자리 번호.
 *
 * @apiSuccess {boolean} isSuccess 방을 들어갈 수 있는지 여부
 * @apiSuccess {String} message 오류가 발생한 경우, 오류 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: true,
 *     }
 *
 * @apiSuccessExample 열리지 않는 방에 접근함
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: false,
 *       message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요.',
 *     }
 */
router.get('/:roomNumber', isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isSuccess: true,
  });
});

router.get('/:roomNumber/name', isRoomNumberValid, isRoomExist, (req, res) => {
  res.json({
    isError: true,
    message: '닉네임을 입력하세요.',
  });
});

/**
 * @api {get} /room/:roomNumber/:nickname 방에서 유효한 닉네임인지 확인 요청
 * @apiName checkValidNickname
 * @apiGroup room
 *
 * @apiParam {String} roomNumber 방의 고유한 6자리 번호.
 * @apiParam {String} nickname 유저가 입력한 닉네임.
 *
 * @apiSuccess {boolean} isSuccess 입력한 닉네임으로 방을 들어갈 수 있는지 여부
 * @apiSuccess {String} message 오류가 발생한 경우, 오류 메시지
 */
router.get(
  '/:roomNumber/name/:nickname',
  isRoomNumberValid,
  isRoomExist,
  isValidNickname,
  isNicknameOverlap,
  (req, res) => {
    res.json({
      isSuccess: true,
    });
  },
);

router.get('/quizset/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const { isError, data } = await dbManager.quizset.readLastQuizsetId(roomId);
  const isSuccess = isError === undefined && data.length > 0;
  const quizsetId = isSuccess ? data[0].id : undefined;
  // undefined를 front에서 사용하기 때문에 보냄
  res.json({
    isSuccess,
    data: {
      quizsetId,
    },
  });
});

module.exports = router;
