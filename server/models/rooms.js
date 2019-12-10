const dbManager = require('./database/dbManager');
const { quizTemplate, itemTemplate } = require('./templates/quiz');
const { roomTemplate } = require('./templates/room');

class Rooms {
  constructor() {
    this.rooms = new Map();
  }

  getRoom(roomNumber) {
    return this.rooms.get(roomNumber);
  }

  getPlayers(roomNumber) {
    const players = [];
    this.getRoom(roomNumber).players.forEach((score, nickname) => {
      players.push({
        score,
        nickname,
      });
    });

    return players;
  }

  getPlayerScore(roomNumber, nickname) {
    return this.getRoom(roomNumber).players.get(nickname);
  }

  getQuizSet(roomNumber) {
    return this.getRoom(roomNumber).quizSet;
  }

  getSubResult(roomNumber, quizIndex) {
    return this.getRoom(roomNumber).quizSet[quizIndex].items;
  }

  getFinalResult(roomNumber) {
    const currentRoom = this.getRoom(roomNumber);
    const SCORE = 1;

    currentRoom.players = new Map(
      [...currentRoom.players.entries()].sort(
        (player1, player2) => player2[SCORE] - player1[SCORE],
      ),
    );

    return this.getPlayers(roomNumber).slice(0, 9);
  }

  getRoomHostId(roomNumber) {
    return this.isRoomExist(roomNumber)
      ? this.getRoom(roomNumber).hostId
      : null;
  }

  async setQuizSet(roomNumber, roomId) {
    const { data } = await dbManager.quizset.getQuizset(roomId);
    const quizset = [];

    let quizIndex = -1;
    data.forEach((currentValue, index) => {
      if (index % 4 === 0) {
        quizIndex += 1;
        const currentQuiz = quizTemplate();
        currentQuiz.title = currentValue.quizTitle;
        currentQuiz.score = currentValue.score;
        currentQuiz.timeLimit = currentValue.time_limit;
        currentQuiz.image = currentValue.image;

        quizset.push(currentQuiz);
      }
      const currentItem = itemTemplate();
      currentItem.title = currentValue.itemTitle;
      quizset[quizIndex].items.push(currentItem);
      if (currentValue.is_answer === 1) {
        quizset[quizIndex].answers.push(currentValue.item_order);
      }
    });

    this.getRoom(roomNumber).quizSet = quizset;
  }

  setNewRoom(hostId) {
    let isExist = true;
    let newRoomNumber;

    while (isExist) {
      newRoomNumber = Math.floor(Math.random() * 899999 + 100000);
      isExist = this.isRoomExist(String(newRoomNumber));
    }

    const newRoom = roomTemplate();
    newRoom.hostId = hostId;

    this.rooms.set(String(newRoomNumber), newRoom);
    return String(newRoomNumber);
  }

  setNewPlayer(roomNumber, nickname) {
    this.getRoom(roomNumber).players.set(nickname, 0);

    return this.getPlayers(roomNumber);
  }

  updateQuizCount({ roomNumber, quizIndex, choose }) {
    const currentQuiz = this.getRoom(roomNumber).quizSet[quizIndex];
    currentQuiz.items[choose].playerCount += 1;
  }

  updatePlayerScore({ roomNumber, quizIndex, choose, nickname }) {
    const currentQuiz = this.getRoom(roomNumber).quizSet[quizIndex];

    const result = currentQuiz.answers.includes(choose);

    if (result) {
      const currentScore = this.getRoom(roomNumber).players.get(nickname);
      this.rooms
        .get(roomNumber)
        .players.set(nickname, currentScore + currentQuiz.score);
    }

    const score = this.getRoom(roomNumber).players.get(nickname);

    return [result, score];
  }

  deletePlayer(roomNumber, nickname) {
    return this.getRoom(roomNumber).players.delete(nickname);
  }

  deleteRoom(hostId) {
    this.rooms.forEach((room, roomNumber) => {
      if (room.hostId === hostId) {
        const result = this.rooms.delete(roomNumber);
        return result ? roomNumber : false;
      }
    });
  }

  isRoomExist(roomNumber) {
    return this.rooms.has(roomNumber);
  }

  isPlayerExist(roomNumber, nickname) {
    return this.getRoom(roomNumber).players.has(nickname);
  }
}

module.exports = Rooms;
