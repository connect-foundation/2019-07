const express = require('express');
const checkJsonHasKeys = require('../../utils/checkJsonHasKeys');
const inMemory = require('../../models/inMemory');

const router = express.Router();

/**
 * 방 번호를 입력받으면 그 방이 열려있는지 확인해줌
 *
 * @param {int} roomNumber 6자리 숫자로 이루어진 방 번호
 *
 * @returns {bool} 번호가 유효한지(6자리 숫자) 아닌지 여부
 */
function isRoomNumberValid(roomNumber) {
  if (String(roomNumber).length !== 6) return false;
  if (/[^0-9]/.test(String(roomNumber))) return false;
  return true;
}

/**
 * 방 번호를 입력받으면 그 방이 열려있는지 확인해줌
 *
 * @param {int} roomNumber 6자리 숫자로 이루어진 방 번호
 *
 * @returns {bool} isExist 존재하는지 아닌지 여부
 */
function isRoomExist(roomNumber) {
  const rooms = inMemory.getRooms();
  return !!rooms.find((room) => room.roomNumber === roomNumber);
}

/**
 * @api {post} /room/checkRoomNumber 유효한 방인지 확인 요청
 * @apiName checkRoomNumber
 * @apiGroup room
 *
 * @apiParam {roomNumber} id 방의 고유한 6자리 번호.
 *
 * @apiSuccess {bool} isSuccess 방을 들어갈 수 있는지 여부
 * @apiSuccess {bool} isError 정상 동작 되지 않는 이유
 * @apiSuccess {string} message 오류가 발생한 경우, 오류 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: true,
 *     }
 *
 * @apiSuccessExample req.body에 인자 없음:
 *     HTTP/1.1 200 OK
 *     {
 *       isError: true,
 *       isSuccess: false,
 *       message: 'req.body에 roomNumber가 없습니다.',
 *     }
 *
 * @apiSuccessExample 열리지 않은 방에 접근하려고 함:
 *     HTTP/1.1 200
 *     {
 *       isSuccess: false,
 *       message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요.',
 *     }
 */
router.post('/checkRoomNumber', (req, res) => {
  const keys = ['roomNumber'];

  if (!checkJsonHasKeys(req.body, keys)) {
    res.json({
      isError: true,
      isSuccess: false,
      message: 'req.body에 roomNumber가 없습니다.',
    });
    return;
  }

  // 유효한 번호인지 검사
  if (!isRoomNumberValid(req.body.roomNumber)) {
    res.json({
      isSuccess: false,
      message: '유효하지 않은 번호입니다. 방 번호를 다시 입력해주세요.',
    });
    return;
  }

  // 유효한 방인지 검사
  if (!isRoomExist(req.body.roomNumber)) {
    res.json({
      isSuccess: false,
      message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요.',
    });
    return;
  }

  res.json({
    isSuccess: true,
  });
});

/**
 * @api {post} /room/enterRoom 방으로 입장 처리
 * @apiName enterRoom
 * @apiGroup room
 *
 * @apiParam {roomNumber} id 방의 고유한 6자리 번호.
 * @apiParam {nickname} nickname 사용자가 입력한 닉네임
 *
 * @apiSuccess {bool} isSuccess 방을 들어갈 수 있는지 여부
 * @apiSuccess {string} message 오류가 발생한 경우, 오류 메시지
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: true,
 *     }
 *
 * @apiSuccessExample req.body에 인자 없음:
 *     HTTP/1.1 200 OK
 *     {
 *       isSuccess: false,
 *       message: 'req.body에 roomNumber가 없습니다.',
 *     }
 */
router.post('/enterRoom', (req, res) => {
  const keys = ['roomNumber', 'nickname'];
  if (!checkJsonHasKeys(req.body, keys)) {
    res.json({
      isSuccess: false,
      message: 'req.body에 roomNumber가 없습니다.',
    });
    return;
  }

  const { roomNumber, nickname } = req.body;
  inMemory.pushUser(roomNumber, nickname);
  res.json({
    isSuccess: true,
  });
});

module.exports = router;
