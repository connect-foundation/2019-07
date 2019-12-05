const HostGameAction = {
  SET_SOCKET: 'SET_SOCKET',
  SET_ROOM_NUMBER: 'SET_ROOM_NUMBER',
  SET_PLAYERS: 'SET_PLAYERS',
  GAME_START: 'GAME_START',
  SET_CURRENT_QUIZ: 'SET_CURRENT_QUIZ',
  REQUEST_NEXT_QUIZ: 'REQUEST_NEXT_QUIZ',
  REQUEST_SUB_RESULT: 'REQUEST_SUB_RESULT',
  SET_SUB_RESULT: 'SET_SUB_RESULT',
  SET_ENTIRE_QUIZ: 'SET_ENTIRE_QUIZ',
  REQUEST_QUIZ_END: 'REQUEST_QUIZ_END',
  SHOW_SCOREBOARD: 'SHOW_SCOREBOARD',
};

const roomReducer = (state, action) => {
  switch (action.type) {
    case HostGameAction.SET_SOCKET: {
      return { ...state, socket: action.socket };
    }
    case HostGameAction.SET_ROOM_NUMBER: {
      return { ...state, roomNumber: action.roomNumber };
    }
    case HostGameAction.SET_PLAYERS: {
      return { ...state, players: action.players };
    }
    case HostGameAction.GAME_START: {
      state.socket.emit('start', { roomNumber: state.roomNumber });
      return { ...state, isQuizStart: true };
    }
    case HostGameAction.SET_CURRENT_QUIZ: {
      return {
        ...state,
        currentQuiz: {
          ...state.fullQuizData[action.index],
          index: action.index,
        },
      };
    }
    case HostGameAction.REQUEST_NEXT_QUIZ: {
      state.socket.emit('next', {
        roomNumber: state.roomNumber,
        nextQuizIndex: state.currentQuiz.index + 1,
      });

      return state;
    }
    case HostGameAction.REQUEST_SUB_RESULT: {
      state.socket.emit('break', {
        roomNumber: state.roomNumber,
        quizIndex: state.currentQuiz.index,
      });

      return state;
    }
    case HostGameAction.SET_SUB_RESULT: {
      return { ...state, quizSubResult: action.subResult };
    }
    case HostGameAction.SET_ENTIRE_QUIZ: {
      return {
        ...state,
        fullQuizData: action.data,
        totalQuizCount: action.data.length,
      };
    }
    case HostGameAction.REQUEST_QUIZ_END: {
      state.socket.emit('end', {
        roomNumber: state.roomNumber,
      });

      return state;
    }
    default:
      return state;
  }
};

const initialRoomState = {
  roomNumber: '',
  players: [],
  socket: null,
  fullQuizData: [],
  totalQuizCount: 0,
  isQuizStart: false,
  isQuizEnd: false,
  currentQuiz: null,
  quizSubResult: null,
};

export { initialRoomState, roomReducer, HostGameAction };
