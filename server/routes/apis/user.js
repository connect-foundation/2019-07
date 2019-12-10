const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const dbManager = require('../../models/database/dbManager');

/**
 * 유저의 모든 방을 가져오는 API
 * @api {get} /user/:userId/rooms
 * @apiName getRooms
 * @apiGroup user
 *
 * @apiParam {string} userId 유저의 email id
 *
 * @apiSuccessData {object array} 유저가 가진 모든 방
 * {
 *  title: '방 이름'
 *  id: '방의 id'
 * }
 */
router.get('/:userId/rooms', async (req, res) => {
  const { userId } = req.params;
  const result = await dbManager.room.selectRooms(userId);

  res.send(result);
});

router.get('/room/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const result = await dbManager.room.getRoomTitle(roomId);

  res.send(result);
});

/**
 * 새로운 방을 추가하는 API
 *
 * @api {post} /user/room
 * @apiName addRoom
 * @apiGroup user
 *
 * @apiParam {string} title 새로운 방의 이름 (26글자 이내)
 * @apiParam {string} userId 유저의 email id
 *
 * @apiSuccessData {object} DB insert 결과 (inserId 등)
 */
router.post(
  '/room',
  [
    check('userId').exists(),
    check('title')
      .exists()
      .bail()
      .isLength({
        min: 1,
        max: 26,
      }),
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const { title, userId } = req.body;
      const result = await dbManager.room.insertRoom(userId, title);

      res.send(result);
    } catch (err) {
      res.send({
        isError: true,
        message: err.message,
      });
    }
  },
);

/**
 * 방의 이름을 수정하는 API
 * @api {put} /user/room
 * @apiName updateRoomTitle
 * @apiGroup
 *
 * @apiParam {string} roomId 방의 ID
 * @apiParam {string} 수정되는 방의 이름 (26글자 이내)
 *
 * @apiSuccess {object} DB insert 결과 (영향을 받은 column의 개수 등)
 */
router.put(
  '/room',
  [
    check('roomId').exists(),
    check('title')
      .exists()
      .bail()
      .isLength({
        min: 1,
        max: 26,
      }),
  ],
  async (req, res) => {
    try {
      validationResult(req).throw();
      const { roomId, title } = req.body;
      const result = await dbManager.room.updateRoom(roomId, title);

      res.send(result);
    } catch (err) {
      res.send({
        isError: true,
        message: err.message,
      });
    }
  },
);

module.exports = router;
