const express = require('express');

const router = express.Router();

const room = require('./apis/room');
const user = require('./apis/user');

router.use('/room', room);
router.use('/user', user);

module.exports = router;
