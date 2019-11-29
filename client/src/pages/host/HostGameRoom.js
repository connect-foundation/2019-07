/**
 * module import 생략
 */
function HostGameRoom() {
  const socket = io.connect(process.env.REACT_APP_BACKEND_HOST);
  const [roomState, dispatcher] = useReducer(roomReducer, initialRoomState);

  useEffect(() => {
    dispatcher({ type: "socket", socket });
    socket.emit("openRoom");
    socket.on("openRoom", ({ roomNumber }) => {
      dispatcher({ type: "roomNumber", roomNumber });
    });

    window.addEventListener("beforeunload", e => {
      e.returnValue = "warning";
    });

    return () => {
      socket.emit("closeRoom");
    };
  }, []);

  //   socket.on("enterPlayer", players => {
  //   socket.on("leavePlayer", players => {

  socket.on("next", nextQuizIndex => {
    dispatcher({ type: "setCurrentQuiz", index: nextQuizIndex });
  });

  socket.on("subResult", subResult => {
    dispatcher({ type: "setSubResult", subResult });
  });

  return (
    <Container>
      <Prompt message="페이지를 이동하면 방이 닫힐 수 있습니다. 계속 하시겠습니까?" />
      {!roomState.isQuizStart && !roomState.currentQuiz && (
        <HostWaitingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.isQuizStart && !roomState.currentQuiz && (
        <HostLoading state={roomState} dispatcher={dispatcher} />
      )}
      {roomState.currentQuiz && !roomState.isQuizEnd && (
        <HostQuizPlayingRoom dispatcher={dispatcher} state={roomState} />
      )}
      {roomState.isQuizEnd && <GameResult />}
      <HostFooter roomNumber={roomState.roomNumber} />
    </Container>
  );
}

export default HostGameRoom;
