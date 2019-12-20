const roomTemplate = () => ({
  players: new Map(),
  submittedPlayers: new Map(),
  hostId: '',
  quizSet: [],
});

module.exports = {
  roomTemplate,
};
