/**
 * module import 생략
 * Styled-Componet 생략: Container, Title, ItemContaier, QuizInformation
 */
function HostQuizPlayingRoom({ state, dispatcher }) {
  const [showSubResult, setSubResultState] = useState(false);

  useEffect(() => {
    if (state.quizSubResult) {
      setSubResultState(true);
    }
  }, [state.quizSubResult]);

  useEffect(() => {
    setSubResultState(false);
  }, [state.currentQuiz]);

  return (
    <Container>
      <Title>
        <QuizInformation>
          {state.currentQuiz.index + 1}/{state.totalQuizCount}
        </QuizInformation>
        {state.currentQuiz.title}
      </Title>
      {!showSubResult && <HostPlaying state={state} dispatcher={dispatcher} />}
      {showSubResult && <HostSubResult state={state} dispatcher={dispatcher} />}
      <ItemContainer>
        <li style={{ backgroundColor: colors.ITEM_COLOR[0] }}>
          {state.currentQuiz.items[0].title}
        </li>
        {/* 동일한 구조 <li> 3개 생략 */}
      </ItemContainer>
    </Container>
  );
}

HostQuizPlayingRoom.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.array,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.number.isRequired
  }).isRequired,
  dispatcher: PropTypes.func.isRequired
};

export default HostQuizPlayingRoom;
