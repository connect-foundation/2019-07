const express = require('express');
const checkJsonHasKeys = require('../../utils/checkJsonHasKeys');
const inMemory = require('../../models/inMemory');

const router = express.Router();

/**
 * 입장하고싶은 방에 닉네임이 중복되어있는지 확인
 *
 * @param {string} nickname 사용자가 입력한 nickname
 * @param {int} roomIndex 6자리 숫자로 이루어진 방 번호
 *
 * @returns {bool} isOverlap 중복되었는지 아닌지 여부
 */
function isNicknameOverlap(nickname, roomNumber) {
  const room = inMemory.getRoom(roomNumber);
  // need to check Error : room이 비어있으면? 방 번호 먼저 입력하니까 그럴 일은 없겠지만..
  return !!room.userList.find((user) => user.nickname === nickname);
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
  if (isNicknameOverlap(nickname, roomNumber)) {
    res.json({ isSuccess: false, message: '닉네임이 중복됩니다.' });
    return;
  }

  res.json({ isSuccess: true });
});

module.exports = router;
