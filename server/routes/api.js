const express = require('express');

const router = express.Router();

const room = require('./apis/room');
const user = require('./apis/user');
const login = require('./apis/login');

router.use('/room', room);
router.use('/user', user);
router.use('/login', login);

module.exports = router;
