const { check, validationResult } = require('express-validator');
const rooms = require('../models/rooms');

/**
 * 방 번호를 입력 받아서 값이 유효한지 확인함. (6자리 체크, 숫자가 아닌지 체크)
 *
 * @param {String} roomNumber 6자리 숫자로 이루어진 방 번호
 *
 * @action Check-Fail:
 * HTTP/1.1 200 OK
 * {
 *    isSuccess: false,
 *    message: '유효하지 않은 방입니다. 방 번호를 다시 입력해주세요'
 * }
 * @action Check-Success:
 *  next middleware
 */
async function isRoomNumberValid(req, res, next) {
  await check('roomNumber')
    .trim()
    .isLength(6)
    .bail()
    .isNumeric()
    .run(req);

  if (!validationResult(req).isEmpty()) {
    res.json({
      isSuccess: false,
      message: '유효하지 않은 방입니다. 방 번호를 다시 입력해주세요.',
    });
    return;
  }

  next();
}

/**
 * 방 번호를 입력 받아서 존재하는 방인지 확인함. (인메모리에 존재하는 번호인지 확인)
 *
 * @param {String} roomNumber 6자리 숫자로 이루어진 방 번호
 *
 * @action Check-Fail:
 * HTTP/1.1 200 OK
 * {
 *    isSuccess: false,
 *    message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요'
 * }
 * @action Check-Success:
 *  next middleware
 */
function isRoomExist(req, res, next) {
  const { roomNumber } = req.params;

  if (!rooms.getRoom(roomNumber)) {
    res.json({
      isSuccess: false,
      message: '존재하지 않는 방입니다. 방 번호를 다시 입력해주세요.',
    });
    return;
  }

  next();
}

/**
 * 닉네임을 입력받아서 유효한지 확인함 (3자리 이상, 20자리 이하)
 *
 * @param {String} nickname 3자리 이상, 20자리 이하의 닉네임
 *
 * @action Check-Fail:
 * HTTP/1.1 200 OK
 * {
 *    isSuccess: false,
 *    message: '유효하지 않은 닉네임입니다. 닉네임을 다시 입력해주세요'
 * }
 * @action Check-Success:
 *  next middleware
 */
async function isValidNickname(req, res, next) {
  await check('nickname')
    .trim()
    .isLength({ min: 3, max: 20 })
    .bail()
    .custom((value) => /[가-힣\w]+/g.exec(value)[0] === value)
    .run(req);

  if (!validationResult(req).isEmpty()) {
    res.json({
      isSuccess: false,
      message: '유효하지 않은 닉네임입니다. 닉네임을 다시 입력해주세요.',
    });
    return;
  }

  next();
}

/**
 * 닉네임을 입력받아서 중복되는지 확인함 (인메모리 내 같은 닉네임이 존재하는지 확인)
 *
 * @param {String} nickname 3자리 이상, 20자리 이하의 닉네임
 *
 * @action Check-Fail:
 * HTTP/1.1 200 OK
 * {
 *    isSuccess: false,
 *    message: '이미 존재하는 닉네임입니다. 닉네임을 다시 입력해주세요'
 * }
 * @action Check-Success:
 *  next middleware
 */
function isNicknameOverlap(req, res, next) {
  const { nickname, roomNumber } = req.params;

  const room = rooms.getRoom(roomNumber);
  const isAlreadyExist = !!room.players.find(
    (player) => player.nickname === nickname,
  );

  if (isAlreadyExist) {
    res.json({
      isSuccess: false,
      message: '이미 존재하는 닉네임입니다. 닉네임을 다시 입력해주세요.',
    });
    return;
  }

  next();
}

module.exports = {
  isRoomExist,
  isRoomNumberValid,
  isNicknameOverlap,
  isValidNickname,
};
