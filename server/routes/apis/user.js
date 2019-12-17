const express = require('express');
const { check, validationResult } = require('express-validator');
const { isUserValid } = require('../../middleware/validations');

const router = express.Router();

const dbManager = require('../../models/database/dbManager');

router.use(isUserValid);
/**
 * 유저의 모든 방을 가져오는 API
 * @api {get} /api/user/:userId/rooms
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
 * @api {post} /api/user/room
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
 * @api {put} /api/user/room
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
      const { isSuccess, data } = await dbManager.room.updateRoom(
        roomId,
        title,
      );

      if (isSuccess && data.affectedRows) {
        res.send({
          isSuccess,
        });
        return;
      }

      res.send({
        isError: true,
        data,
      });
    } catch (err) {
      res.send({
        isError: true,
        message: err.message,
      });
    }
  },
);

router.delete('/room', [check('roomId').exists()], async (req, res) => {
  try {
    validationResult(req).throw();
    const { roomId } = req.body;
    const { isSuccess, data } = await dbManager.room.deleteRoom(roomId);

    if (isSuccess && data.affectedRows) {
      res.send({
        isSuccess,
      });
      return;
    }

    res.send({
      isError: true,
      data,
    });
  } catch (err) {
    res.send({
      isError: true,
      message: err.message,
    });
  }
});

/**
 * 방의 퀴즈 목록을 가져오는 API
 * @api {put} /api/user/quizset/:roomId
 * @apiName getRoomQuizset
 * @apiGroup
 *
 * @apiParam {string} roomId 방의 ID
 *
 * @apiSuccess {object} DB select 결과 (방에 속한 퀴즈의 목록)
 */
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
