/**
 * module import 생략
 * Styled-Component 생략: ButtonContainer, QuizContainer, RemainTime
 */
function HostPlaying({ state, dispatcher }) {
  const [remainTime, setRemainTime] = useState(0);

  useEffect(() => {
    setRemainTime(Number(state.currentQuiz.timeLimit));
    const timer = setInterval(() => {
      setRemainTime(cur => {
        if (cur === 0) {
          clearInterval(timer);
          dispatcher({ type: "break" });
          return 0;
        }
        return cur - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [state.currentQuiz]);

  return (
    <>
      <ButtonContainer>
        <GreenButton
          onClick={() => {
            dispatcher({ type: "break" });
          }}
        >
          다음퀴즈
        </GreenButton>
      </ButtonContainer>
      <QuizContainer>
        <RemainTime>{remainTime}</RemainTime>
      </QuizContainer>
    </>
  );
}

HostPlaying.propTypes = {
  state: PropTypes.shape({
    currentQuiz: PropTypes.object.isRequired
  }).isRequired,
  dispatcher: PropTypes.func.isRequired
};

export default HostPlaying;
