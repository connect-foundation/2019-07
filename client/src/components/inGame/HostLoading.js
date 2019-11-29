/**
 * module import 생략
 * Styled-component 생략; Container, Main, Notify
 */
function HostLoading({ state, dispatcher }) {
  useEffect(() => {
    fetchQuizSet(state.roomNumber).then(response => {
      dispatcher({
        type: "setFullQuiz",
        data: response.quizSet
      });
    });
  }, []);
  return (
    <Container>
      <Main>
        <Notify>
          퀴즈가 준비 중이에요 <br />
          잠시 기다려주세요
        </Notify>
        <ProgressBar animationDurationSeconds={3} />
      </Main>
    </Container>
  );
}

HostLoading.propTypes = {
  dispatcher: PropTypes.func.isRequired,
  state: PropTypes.shape({
    roomNumber: PropTypes.string.isRequired
  }).isRequired
};

export default HostLoading;
