const express = require('express');

const router = express.Router();

const dbManager = require('../../models/database/dbManager');

router.get('/:userId/rooms', async (req, res) => {
  const { userId } = req.params;
  const result = await dbManager.room.selectRooms(userId);

  res.send(result);
});

module.exports = router;
