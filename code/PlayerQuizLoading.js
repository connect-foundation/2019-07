import React, { useEffect } from "react";
import styled from "styled-components";

import ProgressBar from "./ProgressBar";
import { fetchQuizSet } from "../../utils/fetch";

const Saying = styled.span`
  margin-top: auto;
  justify-self: center;
  font-size: 5vw;
  font-style: italic;
  text-align: center;
`;

/**
 * 로딩 페이지에서 퀴즈 세트를 요청하고, 상위 컴포넌트에 있는 state의 내용을 갱신하는 방식으로 구성되어 있습니다.
 *
 * 이 방식으로 작성하니 하위 컴포넌트로 넘어가는 인자의 갯수가 늘어나,
 * 각 컴포넌트들을 관리하기 어려운 느낌이 있어 구조를 바꾸려고 합니다
 *
 * 어떤 방식으로 구조를 바꾸면 좋을지 궁금합니다
 */

function PlayerQuizLoading({ setQuizSet, roomNumber }) {
  useEffect(() => {
    fetchQuizSet(roomNumber).then(response => {
      setQuizSet(response.quizSet);
    });
  }, []);

  return (
    <>
      <Saying>
        사람이 유머감각이 있는 게 아니다. <br />
        유머 감각이 사람을 움직이는 것이다.
      </Saying>
      <ProgressBar animationDurationSeconds={3} />
    </>
  );
}

export default PlayerQuizLoading;
