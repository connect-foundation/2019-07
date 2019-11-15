const io = require("socket.io")();

let hostId = null;
function handleOpenRoom() {
  hostId = this.id;
}

function handleStartQuiz() {
  io.emit("startQuiz");
}

function handleEnterPlayer({ nickname }) {
  this.nickname = nickname;
  io.to(hostId).emit("enterPlayer", nickname);
}

io.on("connection", socket => {
  socket.on("openRoom", handleOpenRoom.bind(socket));
  socket.on("startQuiz", handleStartQuiz.bind(socket));
  socket.on("enterPlayer", handleEnterPlayer.bind(socket));
});

module.exports = io;
