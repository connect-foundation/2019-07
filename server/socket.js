const io = require("socket.io")();
const rooms = require("./models/rooms");
const roomTemplate = require("./models/templates/room");
const playerTemplate = require("./models/templates/player");

// function handleOpenRoom() {
// function isRoomExist(roomNumber) {
function handleStartQuiz({ roomNumber }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit("start");

  setTimeout(() => {
    io.to(roomNumber).emit("next", 0);
  }, 3000);
}

function handleNextQuiz({ roomNumber, nextQuizIndex }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit("next", nextQuizIndex);
}

function handlePlayerChoose({
  roomNumber,
  nickname,
  quizIndex,
  selectItemIndex
}) {
  if (!isRoomExist(roomNumber)) return;

  rooms.UpdatePlayerScore({
    roomNumber,
    nickname,
    quizIndex,
    selectItemIndex
  });
}

function handleBreakQuiz({ roomNumber, quizIndex }) {
  if (!isRoomExist(roomNumber)) return;

  this.join(roomNumber, () => {
    io.to(this.id).emit("subResult", rooms.getSubResult(roomNumber, quizIndex));
  });

  io.to(roomNumber).emit("break");
}

function handleEndQuiz({ roomNumber }) {
  if (!isRoomExist(roomNumber)) return;

  io.to(roomNumber).emit("end", rooms.getFinalResult(roomNumber));
}

// function handleEnterPlayer({ roomNumber, nickname }) {
// function handleLeavePlayer({ roomNumber, nickname }) {
// function handleCloseRoom() {
io.on("connection", socket => {
  socket.on("disconnect", handleCloseRoom.bind(socket));
  socket.on("openRoom", handleOpenRoom.bind(socket));
  socket.on("closeRoom", handleCloseRoom.bind(socket));
  socket.on("start", handleStartQuiz.bind(socket));
  socket.on("next", handleNextQuiz.bind(socket));
  socket.on("choose", handlePlayerChoose.bind(socket));
  socket.on("break", handleBreakQuiz.bind(socket));
  socket.on("end", handleEndQuiz.bind(socket));
  socket.on("enterPlayer", handleEnterPlayer.bind(socket));
  socket.on("leavePlayer", handleLeavePlayer.bind(socket));
});

module.exports = io;
