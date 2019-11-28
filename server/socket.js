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

  io.to(roomNumber).emit('start');

  setTimeout(() => {
    io.to(roomNumber).emit('next', 0);
  }, 3000);
}

function handleNextQuiz({ roomNumber, nextQuizIndex }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit('next', nextQuizIndex);
}

function handlePlayerChoose({
  roomNumber,
  nickname,
  quizIndex,
  selectItemIndex,
}) {
  if (!isRoomExist(roomNumber)) return;

  rooms.UpdatePlayerScore({
    roomNumber,
    nickname,
    quizIndex,
    selectItemIndex,
  });
}

function handleBreakQuiz({ roomNumber, quizIndex }) {
  if (!isRoomExist(roomNumber)) return;

  this.join(roomNumber, () => {
    io.to(this.id).emit('subResult', rooms.getSubResult(roomNumber, quizIndex));
  });

  io.to(roomNumber).emit('break');
}

function handleEndQuiz({ roomNumber }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit('end', rooms.getFinalResult(roomNumber));
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
  socket.on('start', handleStartQuiz.bind(socket));
  socket.on('next', handleNextQuiz.bind(socket));
  socket.on('choose', handlePlayerChoose.bind(socket));
  socket.on('break', handleBreakQuiz.bind(socket));
  socket.on('end', handleEndQuiz.bind(socket));
  socket.on('enterPlayer', handleEnterPlayer.bind(socket));
  socket.on('leavePlayer', handleLeavePlayer.bind(socket));
});

module.exports = io;
