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

    currentRoom.players = new Map(
      [...currentRoom.players.entries()].sort(
        ([player1, player1Score], [player2, player2Score]) => player2Score - player1Score,
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

    data.forEach((currentValue) => {
      let target = quizset.find(
        (object) => object.title === currentValue.quizTitle,
      );

      if (target === undefined) {
        const currentQuiz = quizTemplate();
        currentQuiz.title = currentValue.quizTitle;
        currentQuiz.score = currentValue.score;
        currentQuiz.timeLimit = currentValue.time_limit;
        currentQuiz.image = currentValue.image;
        quizset.push(currentQuiz);

        target = quizset[quizset.length - 1];
      }
      const currentItem = itemTemplate();
      currentItem.title = currentValue.itemTitle;
      target.items.push(currentItem);

      if (currentValue.is_answer === 1) {
        target.answers.push(currentValue.item_order);
      }
    });

    this.getRoom(roomNumber).quizSet = quizset;
  }

  setNewRoom(hostId) {
    const findIdleRoomNumber = () => {
      const roomNumber = Math.floor(Math.random() * 899999 + 100000);
      return this.isRoomExist(String(roomNumber))
        ? findIdleRoomNumber()
        : roomNumber;
    };

    const newRoomNumber = findIdleRoomNumber();
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
    let plusScore = 0;

    if (result) {
      const currentScore = this.getRoom(roomNumber).players.get(nickname);
      this.rooms
        .get(roomNumber)
        .players.set(nickname, currentScore + currentQuiz.score);
      plusScore = currentQuiz.score;
    }

    const score = this.getRoom(roomNumber).players.get(nickname);

    return [result, score, plusScore];
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
