const roomTemplate = () => ({
  players: new Map(),
  submittedPlayers: new Map(),
  deletedPlayers: new Map(),
  hostId: '',
  quizSet: [],
});

module.exports = {
  roomTemplate,
};
