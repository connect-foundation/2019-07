const express = require('express');
const { check, validationResult } = require('express-validator');

const router = express.Router();

const dbManager = require('../../models/database/dbManager');

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

router.post(
  '/room',
  [
    check('title').exists(),
    check('userId').exists(),
    check('title').isLength({
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

module.exports = router;
