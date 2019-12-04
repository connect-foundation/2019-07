const roomTemplate = () => ({
  roomNumber: '',
  players: [],
  hostId: '',
  quizSet: [
    {
      title: '오늘 점심은 무엇을 먹었을까요?',
      image: '',
      items: [
        {
          title: '밥',
          playerCount: 10,
        },
        {
          title: '라면',
          playerCount: 2,
        },
        {
          title: '만두',
          playerCount: 5,
        },
        {
          title: '찐빵',
          playerCount: 3,
        },
      ],
      answers: [0],
      timeLimit: 30,
      score: 1000,
    },
    {
      title: '제일 좋아하는 게임은 무엇일까요?',
      image: '',
      items: [
        {
          title: '리그오브레전드',
          playerCount: 20,
        },
        {
          title: '크레이지아케이드',
          playerCount: 0,
        },
        {
          title: '오버워치',
          playerCount: 100,
        },
        {
          title: '서든어택',
          playerCount: 50,
        },
      ],
      answers: [2],
      timeLimit: 40,
      score: 1000,
    },
    {
      title: '카훗은 만들기 쉽다?',
      image: 'https://files.slack.com/files-pri/TP94WHR34-FQQ2ZAN4X/k-035.png',
      items: [
        {
          title: '예',
          playerCount: 13,
        },
        {
          title: '아니오',
          playerCount: 20,
        },
        {
          title: '예',
          playerCount: 0,
        },
        {
          title: '아니오',
          playerCount: 0,
        },
      ],
      answers: [1, 3],
      timeLimit: 10,
      score: 1000,
    },
  ],
});

module.exports = roomTemplate;
