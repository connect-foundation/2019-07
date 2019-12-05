const express = require('express');

const router = express.Router();

const room = require('./apis/room');
const login = require('./apis/login');
const game = require('./apis/game');
const user = require('./apis/user');

router.use('/room', room);
router.use('/login', login);
router.use('/user', user);
router.use('/', game);

module.exports = router;
