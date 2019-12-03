import * as address from '../constants/apiAddresses';

async function fetchPost({ url, data }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });
  const responseJson = await response.json();
  return responseJson;
}

async function fetchGet({ url }) {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function fetchRoomNumber(roomNumber) {
  const response = await fetchGet({
    url: `/${address.roomApiUrl}/${roomNumber}`,
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchGet({
    url: `/${address.roomApiUrl}/${roomNumber}/${address.name}/${nickname}`,
  });
  return response;
}

async function fetchToken(data) {
  const response = await fetchGet({
    url: `/${address.getToken}/${data.access_token}`,
  });
  return response;
}

async function fetchQuizSet(roomNumber) {
  const response = await fetchGet({
    url: `/${address.roomApiUrl}/${roomNumber}/${address.roomApiGetQuizSet}`,
  });
  return response;
}

async function fetchChoose(object) {
  const { roomNumber, nickname } = object.params;
  const { quizIndex, choose } = object.params;

  // url 양식 : /room/:roomNumber/user/:nickname/quiz/:quizIndex/choose/:choose
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.user}/${nickname}/${address.quiz}/${quizIndex}/${address.choose}/${choose}`;
  const response = await fetchGet({
    url,
  });
  return response;
}

export {
  fetchRoomNumber,
  fetchNickname,
  fetchToken,
  fetchQuizSet,
  fetchChoose,
};
