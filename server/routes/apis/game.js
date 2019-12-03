const express = require('express');

const router = express.Router();

const inMemory = require('../../models/rooms');

const {
  isRoomExist,
  isNicknameExist,
} = require('../../middleware/validations');

/**
 * @api {get} /room/:roomNumber/quiz 현재 방에서 진행 할 퀴즈 세트를 가져오는 API
 * @apiName quiz
 * @apiGroup room
 *
 * @apiParam {string} roomNumber 6글자 방 번호
 *
 * @apiSuccess {Object} quizDataSet 퀴즈 세트
 */
router.get('/room/:roomNumber/quiz', async (req, res) => {
  const { roomNumber } = req.params;
  let quizSet = {};
  // inMemory서 quizSet을 가져옴.
  quizSet = inMemory.getRoom(roomNumber).quizSet;
  // 받아온 quizSet을 전송
  res.json({
    quizSet,
  });
});

/**
 * 유저의 점수 총 합을 알려주는 API
 * @api {get} /room/:roomNumber/user/:nickname
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
  '/room/:roomNumber/player/:nickname',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    const { roomNumber, nickname } = req.params;

    const currentRoom = inMemory.rooms.find(
      (room) => room.roomNumber === roomNumber,
    );
    const currentUser = currentRoom.players.find(
      (player) => player.nickname === nickname,
    );

    res.json({
      nickname,
      score: currentUser.score,
    });
  },
);

/**
 * 퀴즈가 끝나고 특정 유저의 결과 (등수, 점수)를 알려주는 API
 * @api {get} /room/:roomNumber/user/:nickname/result
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
  '/room/:roomNumber/player/:nickname/result',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    const { roomNumber, nickname } = req.params;

    const currentRoom = inMemory.rooms.find(
      (room) => room.roomNumber === roomNumber,
    );
    // 게임 결과가 끝나면 점수 순으로 정렬되므로 index+1 = rank
    const rank = currentRoom.players.findIndex(
      (player) => player.nickname === nickname,
    );
    const currentUser = currentRoom.players[rank];

    res.json({
      nickname,
      score: currentUser.score,
      rank: rank + 1,
    });
  },
);

/**
 * 플레이어가 문항을 선택했을 때 정답, 오답여부를 판별해주는 API
 * @api {get} /room/:roomNumber/user/:nickname/choose/:choose
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
  '/room/:roomNumber/user/:nickname/quiz/:quizIndex/choose/:choose',
  isRoomExist,
  isNicknameExist,
  async (req, res) => {
    // 이 부분을 한 줄로 처리하면 prettier 설정에서 오류가 남.
    const { roomNumber, nickname } = req.params;
    const { quizIndex, choose } = req.params;

    // console.log(roomNumber, nickname, quizIndex, choose);

    const currentRoom = inMemory.rooms.find(
      (current) => current.roomNumber === roomNumber,
    );

    const player = currentRoom.players.find(
      (current) => current.nickname === nickname,
    );

    const quiz = currentRoom.quizSet[quizIndex];

    // choose는 문자열 형태이므로, answer에 있는 정수와 타입을 맞춰주어야함
    const result = quiz.answer.find((answer) => `${answer}` === choose);

    if (result === undefined) {
      res.json({
        isCorrect: false,
        score: player.score,
      });
      return;
    }

    res.json({
      isCorrect: true,
      score: (player.score += quiz.score),
    });
  },
);

module.exports = router;
