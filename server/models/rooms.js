const dbManager = require('./database/dbManager');
const { quizTemplate, itemTemplate } = require('./templates/quiz');

class Rooms {
  constructor() {
    this.rooms = [];
  }

  pushRoom(room) {
    this.rooms.push(room);
    const index = this.rooms.length;

    return index;
  }

  pushPlayer(roomNumber, player) {
    const room = this.getRoom(roomNumber);
    room.players.push(player);
    return true;
  }

  getRoom(roomNumber) {
    return this.rooms.find((room) => room.roomNumber === roomNumber);
  }

  getNewRoomNumber() {
    let newRoomNumber = 111111;

    while (this.getRoom(String(newRoomNumber))) {
      newRoomNumber = Math.floor(Math.random() * 899999 + 100000);
    }

    return String(newRoomNumber);
  }

  getPlayer(roomNumber, nickname) {
    const playingRoom = this.getRoom(roomNumber);

    return playingRoom.players.find((player) => player.nickname === nickname);
  }

  getSubResult(roomNumber, quizIndex) {
    const playingRoom = this.getRoom(roomNumber);

    return playingRoom.quizSet[quizIndex].items;
  }

  getFinalResult(roomNumber) {
    const playingRoom = this.getRoom(roomNumber);
    const sortPlayers = playingRoom.players.sort(
      (player1, player2) => player2.score - player1.score,
    );

    playingRoom.players = sortPlayers;

    return sortPlayers.slice(0, 9);
  }

  removePlayer(roomNumber, nickname) {
    const playersRoom = this.getRoom(roomNumber);
    const playerIndex = playersRoom.players.findIndex(
      (player) => player.nickname === nickname,
    );
    playersRoom.players.splice(playerIndex, 1);

    return playersRoom;
  }

  removeRoom(hostId) {
    const roomIndex = this.rooms.findIndex((room) => room.hostId === hostId);

    if (roomIndex < 0) return false;

    const { roomNumber } = this.rooms[roomIndex];

    this.rooms.splice(roomIndex, 1);
    return roomNumber;
  }

  UpdatePlayerScore({ roomNumber, nickname, quizIndex, selectItemIndex }) {
    const playingRoom = this.getRoom(roomNumber);
    const player = this.getPlayer(roomNumber, nickname);
    const playingQuiz = playingRoom.quizSet[quizIndex];

    playingQuiz.itmes[selectItemIndex].playerCount += 1;

    if (playingQuiz.answer === selectItemIndex) {
      player.score += playingQuiz.score;
    }
  }

  /**
   * dbManager에서 quizset를 받아와, 현재 방의 quizset을 갱신
   */
  async setQuizset(roomNumber, roomId) {
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
}

const rooms = new Rooms();

module.exports = rooms;
