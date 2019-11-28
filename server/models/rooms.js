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
    const TopTenPlayers = playingRoom.players
      .sort((player1, player2) => player2.score - player1.score)
      .splice(0, 9);

    return TopTenPlayers;
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
    const { roomNumber } = this.rooms[roomIndex];

    this.rooms.splice(roomIndex, 1);
    return roomNumber;
  }

  UpdatePlayerScore({
    roomNumber, nickname, quizIndex, selectItemIndex,
  }) {
    const playingRoom = this.getRoom(roomNumber);
    const player = this.getPlayer(roomNumber, nickname);
    const playingQuiz = playingRoom.quizSet[quizIndex];

    playingQuiz.itmes[selectItemIndex].playerCount += 1;

    if (playingQuiz.answer === selectItemIndex) {
      player.score += playingQuiz.score;
    }
  }
}

const rooms = new Rooms();

module.exports = rooms;
