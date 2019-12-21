const express = require('express');

const router = express.Router();
const inMemory = require('../../models/inMemory');

const {
  isRoomExist,
  isNicknameExist,
} = require('../../middleware/validations');

/**
 * @api {get} /api/room/:roomNumber/quiz 현재 방에서 진행 할 퀴즈 세트를 가져오는 API
 * @apiName quiz
 * @apiGroup room
 *
 * @apiParam {string} roomNumber 6글자 방 번호
 *
 * @apiSuccess {Object} quizDataSet 퀴즈 세트
 */
router.get('/:roomNumber/quiz', async (req, res) => {
  const { roomNumber } = req.params;

  try {
    // inMemory서 quizSet을 가져옴.
    const quizSet = inMemory.room.getQuizSet(roomNumber);
    // 받아온 quizSet을 전송
    res.json({
      isSuccess: true,
      quizSet,
    });
  } catch (error) {
    res.json({
      isError: true,
      message: error.message,
    });
  }
});

/**
 * 유저의 점수 총 합을 알려주는 API
 * @api {get} /api/room/:roomNumber/user/:nickname
 * @apiName subResult
 * @apiGroup room
 *
 * @apiParam {string} roomNumber 6글자 방 번호
 * @apiParam {string} nickname 유저의 입장 닉네임
 *
 * @apiSuccess {string} nickname 현제 유저의 닉네임 (string)
 * @apiSuccess {Integer} scores 최신 상태의 점수 (int)
 */
router.get(
  '/:roomNumber/player/:nickname',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    const { roomNumber, nickname } = req.params;

    const score = inMemory.room.getPlayerScore(roomNumber, nickname);

    res.json({
      nickname,
      score,
    });
  },
);

/**
 * 퀴즈가 끝나고 특정 유저의 결과 (등수, 점수)를 알려주는 API
 * @api {get} /api/room/:roomNumber/player/:nickname/result
 * @apiName getResult
 * @apiGroup room
 *
 * @apiParam {string} roomNumber 6글자 방 번호
 * @apiParam {string} nickname 유저의 입장 닉네임
 *
 * @apiSuccess {string} nickname 현제 유저의 닉네임 (string)
 * @apiSuccess {int} scores 최신 상태의 점수 (int)
 * @apiSuccess {int} 등수 (int)
 */
router.get(
  '/:roomNumber/player/:nickname/result',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    const { roomNumber, nickname } = req.params;

    let rank = 1;
    const score = inMemory.room.getPlayerScore(roomNumber, nickname);
    const players = inMemory.room.getPlayers(roomNumber);

    for (let index = 0; index < players.length; index += 1) {
      const currentPlayer = players[index];
      const previousPlayer = players[index - 1];

      if (previousPlayer) {
        rank = previousPlayer.score === currentPlayer.score ? rank : index + 1;
      }

      if (currentPlayer.nickname === nickname) break;
    }

    res.json({
      nickname,
      score,
      rank,
    });
  },
);

/**
 * 플레이어가 문항을 선택했을 때 카운트를 증가시키고,
 * 정답, 오답여부를 판별해주는 API
 * @api {post} /api/room/player/choose/check
 * @apiName choose
 * @apiGroup room
 *
 * @apiParam {string} roomNumber 6글자 방 번호
 * @apiParam {string} nickname 유저의 입장 닉네임
 * @apiParam {int} quizIndex 현재 문제의 index
 * @apiParam {int} choose 유저가 선택한 번호
 *
 * @apiSuccess {bool} isCorrect 선택한 항목이 정답인지 여부
 * @apiSuccess {int} score 갱신된 점수
 */
router.post(
  '/player/choose/check',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    const { quizIndex, choose, roomNumber, nickname } = req.body;

    const [isCorrect, score] = inMemory.room.updatePlayerScore({
      roomNumber,
      quizIndex,
      nickname,
      choose,
    });

    inMemory.room.updateQuizCount({
      roomNumber,
      quizIndex,
      choose,
    });

    res.json({
      isCorrect,
      score,
    });

    inMemory.room.setSubmit({
      roomNumber,
      nickname,
    });

    const isLast = inMemory.room.isLastSubmit({
      roomNumber,
    });
    const socket = req.app.io.sockets;
    if (isLast) {
      const hostId = inMemory.room.getRoomHostId(roomNumber);
      socket
        .to(hostId)
        .emit('subResult', inMemory.room.getSubResult(roomNumber, quizIndex));
      socket.to(roomNumber).emit('break');
    }
  },
);

module.exports = router;
