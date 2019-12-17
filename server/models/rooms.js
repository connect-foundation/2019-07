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

    return this.getPlayers(roomNumber).slice(0, 10);
  }

  getRoomHostId(roomNumber) {
    return this.isRoomExist(roomNumber)
      ? this.getRoom(roomNumber).hostId
      : null;
  }

  async setQuizSet(roomNumber, roomId) {
    const { data } = await dbManager.quizset.getQuizset(roomId);

    const quizset = [];
    const previousArray = [];
    let quizIndex = -1;

    data.forEach((currentValue) => {
      if (!previousArray.find((element) => element === currentValue.id)) {
        const currentQuiz = quizTemplate();
        currentQuiz.title = currentValue.quizTitle;
        currentQuiz.score = currentValue.score;
        currentQuiz.timeLimit = currentValue.time_limit;
        currentQuiz.image = currentValue.image_path;
        currentQuiz.quizOrder = currentValue.quiz_order;

        quizset.push(currentQuiz);
        previousArray.push(currentValue.id);
        quizIndex += 1;
      }

      const currentItem = itemTemplate();
      currentItem.title = currentValue.itemTitle;
      quizset[quizIndex].items.push(currentItem);
      if (currentValue.is_answer === 1) {
        quizset[quizIndex].answers.push(currentValue.item_order);
      }
    });

    quizset.sort((first, second) => first.quizOrder - second.quizOrder);

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

    const isCorrect = currentQuiz.answers.includes(choose);

    if (isCorrect) {
      const currentScore = this.getRoom(roomNumber).players.get(nickname);
      this.rooms
        .get(roomNumber)
        .players.set(nickname, currentScore + currentQuiz.score);
    }

    const score = this.getRoom(roomNumber).players.get(nickname);

    return [isCorrect, score];
  }

  deletePlayer(roomNumber, nickname) {
    return this.getRoom(roomNumber).players.delete(nickname);
  }

  deleteRoom(hostId) {
    const roomList = this.rooms.entries();

    const findHostRoom = () => {
      if (!this.rooms.size) return false;
      const { done, value } = roomList.next();
      const [roomNumber, roomInformation] = value;

      if (hostId === roomInformation.hostId) return roomNumber;
      if (done) return false;

      return findHostRoom();
    };

    const roomNumber = findHostRoom();

    if (roomNumber) {
      const isDeleted = this.rooms.delete(roomNumber);
      return isDeleted ? roomNumber : false;
    }

    return false;
  }

  isRoomExist(roomNumber) {
    return this.rooms.has(roomNumber);
  }

  isPlayerExist(roomNumber, nickname) {
    return this.getRoom(roomNumber).players.has(nickname);
  }
}

module.exports = Rooms;
