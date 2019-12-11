const express = require('express');

const router = express.Router();

const room = require('./apis/room');
const login = require('./apis/login');
const game = require('./apis/game');
const user = require('./apis/user');
const edit = require('./apis/edit');

router.use('/room', room);
router.use('/login', login);
router.use('/user', user);
router.use('/edit', edit);
router.use('/', game);

module.exports = router;
