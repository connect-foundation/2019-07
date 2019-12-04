const roomReducer = (state, action) => {
  switch (action.type) {
    case 'socket': {
      return { ...state, socket: action.socket };
    }
    case 'roomNumber': {
      return { ...state, roomNumber: action.roomNumber };
    }
    case 'players': {
      return { ...state, players: action.players };
    }
    case 'start': {
      state.socket.emit('start', { roomNumber: state.roomNumber });
      return { ...state, isQuizStart: true };
    }
    case 'setCurrentQuiz': {
      return {
        ...state,
        currentQuiz: {
          ...state.fullQuizData[action.index],
          index: action.index,
        },
      };
    }
    case 'next': {
      state.socket.emit('next', {
        roomNumber: state.roomNumber,
        nextQuizIndex: state.currentQuiz.index + 1,
      });

      return state;
    }
    case 'break': {
      state.socket.emit('break', {
        roomNumber: state.roomNumber,
        quizIndex: state.currentQuiz.index,
      });

      return state;
    }
    case 'setSubResult': {
      return { ...state, quizSubResult: action.subResult };
    }
    case 'setFullQuiz': {
      return {
        ...state,
        fullQuizData: action.data,
        totalQuizCount: action.data.length,
      };
    }
    case 'scoreBoard': {
      state.socket.emit('end', {
        roomNumber: state.roomNumber,
      });
      // return { ...state, isQuizEnd: true };
      return { ...state, isQuizEnd: false };
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

export { initialRoomState, roomReducer };
