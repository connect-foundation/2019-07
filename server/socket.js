const io = require('socket.io')();
const rooms = require('./models/rooms');
const roomTemplate = require('./models/templates/room');
const playerTemplate = require('./models/templates/player');

function handleOpenRoom() {
  const roomNumber = rooms.getNewRoomNumber();
  const newRoom = roomTemplate();

  newRoom.hostId = this.id;
  newRoom.roomNumber = roomNumber;

  rooms.pushRoom(newRoom);

  this.join(roomNumber, () => {
    io.to(newRoom.hostId).emit('openRoom', { roomNumber });
  });
}

function isRoomExist(roomNumber) {
  return rooms.getRoom(roomNumber);
}

function handleStartQuiz({ roomNumber }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit('startQuiz');
}

function handleEnterPlayer({ roomNumber, nickname }) {
  if (!isRoomExist(roomNumber)) return;

  const currentRoom = rooms.getRoom(roomNumber);
  const newPlayer = playerTemplate();
  newPlayer.nickname = nickname;

  rooms.pushPlayer(roomNumber, newPlayer);

  this.join(roomNumber, () => {
    io.to(currentRoom.hostId).emit('enterPlayer', currentRoom.players);
  });
}

function handleLeavePlayer({ roomNumber, nickname }) {
  if (!isRoomExist(roomNumber)) return;
  const playerRoom = rooms.removePlayer(roomNumber, nickname);

  this.join(roomNumber, () => {
    io.to(playerRoom.hostId).emit('leavePlayer', playerRoom.players);
  });
}

function handleCloseRoom() {
  const roomNumber = rooms.removeRoom(this.id);
  io.to(roomNumber).emit('closeRoom');
}

io.on('connection', (socket) => {
  socket.on('disconnect', handleCloseRoom.bind(socket));
  socket.on('openRoom', handleOpenRoom.bind(socket));
  socket.on('closeRoom', handleCloseRoom.bind(socket));
  socket.on('startQuiz', handleStartQuiz.bind(socket));
  socket.on('enterPlayer', handleEnterPlayer.bind(socket));
  socket.on('leavePlayer', handleLeavePlayer.bind(socket));
});

module.exports = io;
