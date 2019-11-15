class InMemory {
  constructor() {
    this.rooms = [];
  }

  pushRoom(room) {
    this.rooms.push(room);
    const index = this.rooms.length;

    return index;
  }

  pushUser(roomNumber, nickname) {
    const room = this.getRoom(roomNumber);
    const newUser = {
      nickname,
      score: 0,
    };

    room.userList.push(newUser);
    return true;
  }

  getRooms() {
    return this.rooms;
  }

  getRoom(roomNumber) {
    return this.rooms.find((room) => room.roomNumber === roomNumber);
  }
}

const inMemory = new InMemory();

module.exports = inMemory;
