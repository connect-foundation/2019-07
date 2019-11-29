/**
 * module import 생략
 * Styled-Component 생략: ButtonContainer, ScoreChartContainer
 */
function HostSubResult({ state, dispatcher }) {
  const itemDatas = state.quizSubResult.map((cur, index) => {
    if (state.currentQuiz.answer.includes(index)) {
      return { ...cur, isAnswer: true };
    }
    return { ...cur, isAnswer: false };
  });
  return (
    <>
      <ButtonContainer>
        <GreenButton
          onClick={() => {
            if (state.currentQuiz.index === state.totalQuizCount - 1) {
              dispatcher({ type: "scoreBoard" });
              return;
            }
            dispatcher({ type: "next" });
          }}
        >
          다음퀴즈
        </GreenButton>
      </ButtonContainer>
      <ScoreChartContainer>
        <ScoreChart itemDatas={itemDatas} />
      </ScoreChartContainer>
    </>
  );
}

HostSubResult.propTypes = {
  state: PropTypes.shape({
    quizSubResult: PropTypes.array.isRequired,
    currentQuiz: PropTypes.object.isRequired,
    totalQuizCount: PropTypes.number.isRequired
  }).isRequired,
  dispatcher: PropTypes.func.isRequired
};

export default HostSubResult;
