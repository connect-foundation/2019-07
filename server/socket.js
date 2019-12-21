const io = require('socket.io')();
const inMemory = require('./models/inMemory');

async function handleOpenRoom({ roomId }) {
  const roomNumber = inMemory.room.setNewRoom(this.id);

  await inMemory.room.setQuizSet(roomNumber, roomId);

  this.host = true;
  this.join(roomNumber, () => {
    io.to(inMemory.room.getRoomHostId(roomNumber)).emit('openRoom', {
      roomNumber,
    });
  });
}

function handleStartQuiz({ roomNumber }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit('start');

  setTimeout(() => {
    io.to(roomNumber).emit('next', 0);
  }, 3000);
}

function handleNextQuiz({ roomNumber }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;
  const nextQuizIndex = inMemory.room.setNextQuizIndex(roomNumber);
  io.to(roomNumber).emit('next', nextQuizIndex);
}

function handleBreakQuiz({ roomNumber }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;
  const quizIndex = inMemory.room.getQuizIndex(roomNumber);
  const hostId = inMemory.room.getRoomHostId(roomNumber);
  io.to(hostId).emit(
    'subResult',
    inMemory.room.getSubResult(roomNumber, quizIndex),
  );

  io.to(roomNumber).emit('break');
}

function handleEndQuiz({ roomNumber }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit('end', inMemory.room.getFinalResult(roomNumber));
}

function handleEnterPlayer({ roomNumber, nickname }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;

  const score = inMemory.room.isRefreshingPlayer(roomNumber, nickname);

  if (score !== undefined) {
    this.join(roomNumber, () => {
      io.to(this.id).emit('settingScore', score);
    });
  }

  const players = inMemory.room.setNewPlayer(roomNumber, nickname, score);

  this.join(roomNumber, () => {
    io.to(inMemory.room.getRoomHostId(roomNumber)).emit('enterPlayer', players);
  });
}

function handleLeavePlayer({ roomNumber, nickname }) {
  if (!inMemory.room.isRoomExist(roomNumber)) return;
  const result = inMemory.room.deletePlayer(roomNumber, nickname);

  if (result) {
    io.to(inMemory.room.getRoomHostId(roomNumber)).emit(
      'leavePlayer',
      inMemory.room.getPlayers(roomNumber),
    );
    const isLast = inMemory.room.isLastSubmit({
      roomNumber,
    });
    if (isLast) {
      handleBreakQuiz({
        roomNumber,
      });
    }
  }
}

function handleCloseRoom() {
  if (!this.host) return;
  const roomNumber = inMemory.room.deleteRoom(this.id);
  io.to(roomNumber).emit('closeRoom');
}

io.on('connection', (socket) => {
  socket.on('disconnect', handleCloseRoom.bind(socket));
  socket.on('openRoom', handleOpenRoom.bind(socket));
  socket.on('start', handleStartQuiz.bind(socket));
  socket.on('next', handleNextQuiz.bind(socket));
  socket.on('break', handleBreakQuiz.bind(socket));
  socket.on('end', handleEndQuiz.bind(socket));
  socket.on('enterPlayer', handleEnterPlayer.bind(socket));
  socket.on('leavePlayer', handleLeavePlayer.bind(socket));
});

module.exports = io;
