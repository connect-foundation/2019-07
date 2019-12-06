function PlayerSubResultComponent({
  choose,
  score,
  setScore,
  nickname,
  roomNumber,
  quizIndex
}) {
  const [result, setResult] = useState({ isCorrect: undefined });
  const [plusScore, setPlus] = useState(0);

  useEffect(() => {
    /**
     * fetch.js의 함수를 호출하는 코드입니다
     * fetch 이후 결과 (정답, 오답)을 체크하고 state를 변경해 reRender 시키는
     * 방식으로 구현했습니다.
     */
    fetchCheckAnswer(roomNumber, nickname, quizIndex, choose).then(response => {
      setResult(response);

      if (response.isCorrect) {
        setPlus(Number(response.score) - score);
        setScore(response.score);
      }
    });
  }, []);

  /**
   * 이 경우 fetch후 응답이 오기까지 시간이 걸리기 때문에,
   * state(result)가 undefined인지 여부로 fetch 응답이 오기까지 다른 컴포넌트를
   * 보여주고 있습니다
   *
   * undefined로 직접 비교가 아닌 다른 방법으로 리펙토링하고 싶은데 어떤 방법이
   * 좋을까요?
   */
  if (result.isCorrect === undefined) {
    return (
      <Background color={COLORS.WHITE}>
        <Message>정답을 확인 중 입니다.</Message>
      </Background>
    );
  }

  if (result.isCorrect === false) {
    return (
      <Background color={COLORS.RED}>
        <Message>틀렸습니다.</Message>
      </Background>
    );
  }

  if (result.isCorrect === true) {
    return (
      <Background color={COLORS.GREEN}>
        <Message>맞았습니다.</Message>
        <Score>+{plusScore}</Score>
      </Background>
    );
  }
}

PlayerSubResultComponent.propTypes = {
  choose: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  nickname: PropTypes.string.isRequired,
  roomNumber: PropTypes.string.isRequired,
  quizIndex: PropTypes.number.isRequired
};

export default PlayerSubResultComponent;
