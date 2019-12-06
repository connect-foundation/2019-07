function createQuizTemplete() {
  return {
    quizId: -1,
    title: '',
    image: '',
    items: [
      {
        title: '',
        isAnswer: false,
      },
      {
        title: '',
        isAnswer: false,
      },
      {
        title: '',
        isAnswer: false,
      },
      {
        title: '',
        isAnswer: false,
      },
    ],
    timeLimit: 30,
    score: 1000,
  };
}

const initialQuizsetState = {
  quizsetId: -1,
  quizset: [createQuizTemplete()],
  currentIndex: 0,
  isTimeLimitOpend: false,
};

const actionTypes = {
  ADD_QUIZ: 0,
  CHANGE_TITLE: 1,
  CHANGE_IMAGE: 2,
  CHANGE_SCORE: 3,
  CHANGE_TIME_LIMIT: 4,
  CHANGE_ITEM_IS_ANSWER: 5,
  CHANGE_ITEM_TITLE: 6,
  CHNAGE_CURRENT_INDEX: 7,
  ON_OFF_TIME_LIMIT: 8,
  READ_QUIZSET: 9,
};

function addQuiz(quizset) {
  return [...quizset, createQuizTemplete()];
}
function updateArray(array, index, element) {
  const newArray = array.slice();
  newArray.splice(index, 1, element);
  return newArray;
}

const quizsetReducer = (quizsetState, action) => {
  const { quizset, currentIndex } = quizsetState;
  const quiz = currentIndex === -1 ? undefined : quizset[currentIndex];
  switch (action.type) {
    case actionTypes.ADD_QUIZ: {
      return {
        ...quizsetState,
        quizset: addQuiz(quizset),
        currentIndex: quizset.length,
        isTimeLimitOpend: false,
      };
    }
    case actionTypes.CHNAGE_CURRENT_INDEX: {
      return {
        ...quizsetState,
        currentIndex: action.currentIndex,
        isTimeLimitOpend: false,
      };
    }
    case actionTypes.CHANGE_TITLE: {
      quiz.title = action.title;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.CHANGE_IMAGE: {
      quiz.image = action.image;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.CHANGE_SCORE: {
      quiz.score = action.score;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.CHANGE_TIME_LIMIT: {
      quiz.timeLimit = action.timeLimit;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset, isTimeLimitOpend: false };
    }
    case actionTypes.CHANGE_ITEM_IS_ANSWER: {
      const { itemIndex, itemIsAnswer } = action;
      const { items } = quiz;
      const item = items[itemIndex];
      item.isAnswer = itemIsAnswer;
      quiz.items = updateArray(items, itemIndex, item);
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.CHANGE_ITEM_TITLE: {
      const { itemIndex, itemTitle } = action;
      const { items } = quiz;
      const item = items[itemIndex];
      item.title = itemTitle;
      quiz.items = updateArray(items, itemIndex, item);
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.ON_OFF_TIME_LIMIT: {
      return {
        ...quizsetState,
        isTimeLimitOpend: !quizsetState.isTimeLimitOpend,
      };
    }
    case actionTypes.READ_QUIZSET: {
      return { ...quizsetState, quizset: action.newQuizset };
    }
    default:
      return quizsetState;
  }
};

export { initialQuizsetState, quizsetReducer, actionTypes };
