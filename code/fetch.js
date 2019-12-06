import * as address from "../constants/apiAddresses";

async function fetchPost({ url, data, method = "POST" }) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
    credentials: "include"
  });
  const responseJson = await response.json();
  return responseJson;
}

/**
 * API 주소를 요소별로 관리하다 보니 url의 주소가 너무 길어지고 보기 복잡해지는
 * 문제가 있었습니다
 * 이 문제를 해결하기 위해 3가지 방식을 고민해 봤는데,
 *
 * 1. url을 return하는 함수들을 만들고 url 주소 문자열은 전부 함수로 관리
 * 2. 의미를 가지는 요소 하나하나별로 const로 선언해서 관리하기
 * 3. user, room, player 등은 fetch에서 hardcoding 한 상태로 두기
 *
 * 여기서 1번 방법을 사용하는 편이 좋다고 판단했습니다
 * 예시) const getRoomsAPI = (userId) => '/user/${userId}/rooms'
 *
 * 하지만 1번 방법을 사용하면, url 주소를 확인하기 위해 api주소를 관리하는
 * constant로 들어가서 확인을 해야 하는 문제가 있습니다
 *
 * 혹시나 주소 문자열을 return하는 함수에 주석등으로 설명을 달아 현재 파일에서
 * return 구조를 확인할수 있는지 궁금합니다
 *
 * 어떤 방법이 좋아 보이시는지 의견을 묻고 싶습니다
 */

async function fetchChoose(roomNumber, quizIndex, choose) {
  // url 양식 : /room/:roomNumber/quiz/:quizIndex/choose/:choose
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.quiz}/${quizIndex}/${address.choose}/${choose}`;
  const response = await fetchPost({
    url
  });
  return response;
}

async function fetchCheckAnswer(roomNumber, nickname, quizIndex, choose) {
  // url 양식 : /room/:roomNumber/player/:nickname/quiz/:quizIndex/choose/:choose
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.player}/${nickname}/${address.quiz}/${quizIndex}/${address.choose}/${choose}`;
  const response = await fetchPost({
    url
  });
  return response;
}

export {
  fetchRoomNumber,
  fetchNickname,
  fetchToken,
  fetchQuizSet,
  fetchChoose,
  fetchCheckAnswer,
  fetchRank,
  fetchRooms,
  fetchRoomTitle,
  addRoom,
  updateRoomTitle
};
