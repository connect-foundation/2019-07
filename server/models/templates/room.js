const roomTemplate = () => ({
  players: new Map(),
  submittedPlayers: new Map(),
  deletedPlayers: new Map(),
  waitingPlayers: [],
  hostId: '',
  quizSet: [],
  quizIndex: -1,
});

module.exports = {
  roomTemplate,
};
