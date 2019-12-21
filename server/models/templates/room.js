const roomTemplate = () => ({
  players: new Map(),
  submittedPlayers: new Map(),
  deletedPlayers: new Map(),
  hostId: '',
  quizSet: [],
  quizIndex: 0,
});

module.exports = {
  roomTemplate,
};
