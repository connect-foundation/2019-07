const express = require('express');
const checkJsonHasKeys = require('../../utils/checkJsonHasKeys');
const rooms = require('../../models/rooms');

const router = express.Router();

/**
 * 닉네임을 입력받으면 그 닉네임이 유효한지 확인해줌
 *
 * @param {string} nickname 3~20 자리의 범위인지 체크
 *
 * @returns {bool} 번호가 유효한지(6자리 숫자) 아닌지 여부
 */
function isNicknameValid(nickname) {
  const nicknameTrimmed = nickname.trim();
  if (nicknameTrimmed.length < 3 || nicknameTrimmed.length > 20) return false;
  if (/[^(가-힣a-zA-Z0-9)]/.test(nicknameTrimmed)) return false;
  return true;
}

/**
 * 입장하고싶은 방에 닉네임이 중복되어있는지 확인
 *
 * @param {string} nickname 사용자가 입력한 nickname
 * @param {string} roomNumber 6자리 숫자로 이루어진 방 번호
 *
 * @returns {bool} isOverlap 중복되었는지 아닌지 여부
 */
function isNicknameOverlap(nickname, roomNumber) {
  const room = rooms.getRoom(roomNumber);
  // need to check Error : room이 비어있으면? 방 번호 먼저 입력하니까 그럴 일은 없겠지만..
  return !!room.players.find((player) => player.nickname === nickname);
}

/**
 * @api {post} /user/setNickname Request User information
 * @apiName setNickname
 * @apiGroup user
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 */
router.post('/setNickname', (req, res) => {
  const keys = ['nickname', 'roomNumber'];
  if (!checkJsonHasKeys(req.body, keys)) {
    res.json({
      isError: true,
      isSuccess: false,
      message: 'req.body에 인자가 부족합니다.',
    });
    return;
  }

  const { nickname, roomNumber } = req.body;

  if (!isNicknameValid(nickname)) {
    res.json({
      isSuccess: false,
      message: '유효하지 않은 닉네임입니다. 닉네임을 다시 입력해주세요.',
    });
    return;
  }

  if (isNicknameOverlap(nickname, roomNumber)) {
    res.json({
      isSuccess: false,
      message: '닉네임이 중복됩니다. 닉네임을 다시 입력해주세요.',
    });
    return;
  }

  res.json({ isSuccess: true });
});

module.exports = router;
