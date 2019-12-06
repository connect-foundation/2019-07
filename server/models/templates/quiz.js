const quizTemplate = () => ({
  title: '',
  image: '',
  items: [],
  answers: [],
  timeLimit: 30,
  score: 1000,
});

const itemTemplate = () => ({
  title: '',
  playerCount: 0,
});

module.exports = {
  quizTemplate,
  itemTemplate,
};
