import { parseCamelObject } from '../utils/caseChanger';

const createItem = itemOrder => {
  return {
    id: undefined,
    itemOrder,
    title: '',
    isAnswer: false,
  };
};
const createQuiz = () => {
  return {
    id: undefined,
    title: '',
    quizOrder: 0,
    imagePath: null,
    items: [createItem(0), createItem(1), createItem(2), createItem(3)],
    timeLimit: 30,
    score: 1000,
  };
};

const initialQuizsetState = {
  roomId: undefined,
  quizsetId: undefined,
  quizset: [],
  readedQuizset: [],
  deletedQuizzes: [],
  deleteCount: 0,
  currentIndex: 0,
  isTimeLimitOpend: false,
  isLoading: true,
};

const actionTypes = {
  CREATE_QUIZ: 0,
  UPDATE_TITLE: 1,
  UPDATE_IMAGE: 2,
  UPDATE_SCORE: 3,
  UPDATE_TIME_LIMIT: 4,
  UPDATE_ITEM_IS_ANSWER: 5,
  UPDATE_ITEM_TITLE: 6,
  UPDATE_CURRENT_INDEX: 7,
  ON_OFF_TIME_LIMIT: 8,
  READ_QUIZSET: 9,
  DELETE_QUIZ: 10,
  UPDATE_ROOM_ID: 11,
  CHANGE_LOADING: 12,
};

function addQuiz(quizset) {
  return [...quizset, createQuiz()];
}

function updateArray(array, index, element) {
  const newArray = array.slice();
  newArray.splice(index, 1, element);
  return newArray;
}

const quizsetReducer = (quizsetState, action) => {
  const { quizset, currentIndex } = quizsetState;
  const quiz = quizset[currentIndex];
  switch (action.type) {
    case actionTypes.CREATE_QUIZ: {
      return {
        ...quizsetState,
        quizset: addQuiz(quizset),
        currentIndex: quizset.length,
        isTimeLimitOpend: false,
        isLoading: false,
      };
    }
    case actionTypes.UPDATE_CURRENT_INDEX: {
      return {
        ...quizsetState,
        currentIndex: action.currentIndex,
        isTimeLimitOpend: false,
      };
    }
    case actionTypes.UPDATE_TITLE: {
      quiz.title = action.title;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.UPDATE_IMAGE: {
      quiz.imagePath = action.imagePath;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.UPDATE_SCORE: {
      quiz.score = action.score;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.UPDATE_TIME_LIMIT: {
      quiz.timeLimit = action.timeLimit;
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset, isTimeLimitOpend: false };
    }
    case actionTypes.UPDATE_ITEM_IS_ANSWER: {
      const { itemIndex, itemIsAnswer } = action;
      const { items } = quiz;
      const item = items[itemIndex];
      item.isAnswer = itemIsAnswer;
      quiz.items = updateArray(items, itemIndex, item);
      const newQuizset = updateArray(quizset, currentIndex, quiz);
      return { ...quizsetState, quizset: newQuizset };
    }
    case actionTypes.UPDATE_ITEM_TITLE: {
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
      const getNewQuizset = () => parseCamelObject(action.quizset);
      return {
        ...quizsetState,
        quizset: getNewQuizset(),
        readedQuizset: getNewQuizset(),
        isLoading: false,
      };
    }
    case actionTypes.DELETE_QUIZ: {
      const { deletedQuizzes, deleteCount } = quizsetState;
      const [deletedQuiz] = quizset.splice(currentIndex, 1);
      if (deletedQuiz.id !== undefined) deletedQuizzes.push(deletedQuiz);
      const nextIndex = Math.min(currentIndex, Math.max(quizset.length - 1, 0));
      const nextQuizset = quizset.length > 0 ? quizset : [createQuiz()];
      return {
        ...quizsetState,
        deletedQuizzes,
        quizset: nextQuizset,
        currentIndex: nextIndex,
        isTimeLimitOpend: false,
        deleteCount: deleteCount + 1,
      };
    }
    case actionTypes.UPDATE_ROOM_ID: {
      return { ...quizsetState, roomId: action.roomId };
    }
    case actionTypes.CHANGE_LOADING: {
      return { ...quizsetState, isLoading: action.isLoading };
    }
    default:
      return quizsetState;
  }
};

export { initialQuizsetState, quizsetReducer, actionTypes };
