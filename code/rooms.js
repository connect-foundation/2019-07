const dbManager = require("./database/dbManager");
const { quizTemplate, itemTemplate } = require("./templates/quiz");
const { roomTemplate } = require("./templates/room");

class Rooms {
  constructor() {
    this.rooms = new Map();
  }

  async setQuizSet(roomNumber, roomId) {
    // data의 구조는 ./dataExample.js 파일을 참고하시면 됩니다.
    const { data } = await dbManager.quizset.getQuizset(roomId);

    const quizset = [];

    /**
     * 한 퀴즈당 선택항목(아이템)이 4개씩 할당되어 있습니다.
     *
     * 퀴즈를 저장할 때 퀴즈와 아이템을 정렬하고 저장하기 때문에,
     * 아래와 같이 4개씩 count 해서 quizset 객체를 만들고 있습니다.
     *
     * 지금 방식대로 사용할 경우, 퀴즈세트를 생성하는 데 오류가 생길 것 같아
     * 리펙토링을 하려고 합니다.
     *
     * 현재 계획은 quiz의 PK인 id로 구별을 해서 객체를 생성하려 하고 있습니다.
     * 새로운 로직은 newLogic.js 파일에 적어놨습니다.
     * 기존의 방법과 새로운 방법에서 어떤 부분을 개선하면 좋을지 물어보고 싶습니다.
     */

    let quizIndex = -1;
    data.forEach((currentValue, index) => {
      if (index % 4 === 0) {
        quizIndex += 1;
        const currentQuiz = quizTemplate();
        currentQuiz.title = currentValue.quizTitle;
        currentQuiz.score = currentValue.score;
        currentQuiz.timeLimit = currentValue.time_limit;
        currentQuiz.image = currentValue.image_path;

        quizset.push(currentQuiz);
      }
      const currentItem = itemTemplate();
      currentItem.title = currentValue.itemTitle;
      quizset[quizIndex].items.push(currentItem);
      if (currentValue.is_answer === 1) {
        quizset[quizIndex].answers.push(currentValue.item_order);
      }
    });

    this.getRoom(roomNumber).quizSet = quizset;

    /**
     * 생성된 quizset의 형태
     */
    const quizsetExample = [
      {
        title: "테스트퀴즈",
        image: null,
        items: [[Object], [Object], [Object], [Object]],
        answers: [0],
        timeLimit: 30,
        score: 1000
      },
      {
        title: "테스트퀴즈",
        image: null,
        items: [[Object], [Object], [Object], [Object]],
        answers: [0, 1],
        timeLimit: 30,
        score: 1000
      }
    ];
  }
}

module.exports = Rooms;
