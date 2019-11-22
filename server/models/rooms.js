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
    return this.rooms.find(room => room.roomNumber === roomNumber);
  }

  getNewRoomNumber() {
    let newRoomNumber = 111111;

    while (this.getRoom(String(newRoomNumber))) {
      newRoomNumber = Math.floor(Math.random() * 899999 + 100000);
    }

    return String(newRoomNumber);
  }

  removePlayer(roomNumber, nickname) {
    const playersRoom = this.getRoom(roomNumber);
    const playerIndex = playersRoom.players.findIndex(
      player => player.nickname === nickname
    );
    playersRoom.players.splice(playerIndex, 1);

    return playersRoom;
  }

  removeRoom(hostId) {
    const roomIndex = this.rooms.findIndex(room => room.hostId === hostId);
    const { roomNumber } = this.rooms[roomIndex];

    this.rooms.splice(roomIndex, 1);
    return roomNumber;
  }
}

const rooms = new Rooms();

module.exports = rooms;
