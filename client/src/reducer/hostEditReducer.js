import { parseCamelObject } from '../utils/caseChanger';

const createItem = itemOrder => {
  return {
    id: undefined,
    itemOrder,
    title: '',
    isAnswer: false,
  };
};
const createQuiz = order => {
  return {
    id: undefined,
    title: '',
    quizOrder: order,
    imagePath: null,
    imageFile: null,
    items: [createItem(0), createItem(1), createItem(2), createItem(3)],
    timeLimit: 30,
    score: 1000,
  };
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
  UPDATE_IDS: 11,
  CHANGE_LOADING: 12,
  RESET_DELETE_QUIZZES: 13,
};

const loadingTypes = {
  IDLE: 0,
  READ_DATA: 1,
  UPDATE_DATA: 2,
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
  loadingType: loadingTypes.READ_DATA,
};

function addQuiz(quizset) {
  const order = quizset.length;
  return [...quizset, createQuiz(order)];
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
        loadingType: loadingTypes.IDLE,
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
      quiz.imageFile = action.imageFile;
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
        loadingType: loadingTypes.IDLE,
      };
    }
    case actionTypes.DELETE_QUIZ: {
      const { deletedQuizzes, deleteCount } = quizsetState;
      const [deletedQuiz] = quizset.splice(currentIndex, 1);
      if (deletedQuiz.id !== undefined) deletedQuizzes.push(deletedQuiz);
      const nextIndex = Math.min(currentIndex, Math.max(quizset.length - 1, 0));
      const nextQuizset = quizset.length > 0 ? quizset : [createQuiz()];

      //quizOrder 리셋
      for (let index = nextIndex; index < nextQuizset.length; index += 1) {
        const nextQuiz = nextQuizset[index];
        nextQuiz.quizOrder = index;
      }
      return {
        ...quizsetState,
        deletedQuizzes,
        quizset: nextQuizset,
        currentIndex: nextIndex,
        isTimeLimitOpend: false,
        deleteCount: deleteCount + 1,
      };
    }
    case actionTypes.UPDATE_IDS: {
      const { roomId, quizsetId } = action;
      return { ...quizsetState, roomId, quizsetId };
    }
    case actionTypes.CHANGE_LOADING: {
      return { ...quizsetState, loadingType: action.loadingType };
    }
    case actionTypes.RESET_DELETE_QUIZZES: {
      return { ...quizsetState, deletedQuizzes: [] };
    }
    default:
      return quizsetState;
  }
};

export { initialQuizsetState, quizsetReducer, actionTypes, loadingTypes };
