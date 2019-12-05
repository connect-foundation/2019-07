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

async function addRoom({ userId, roomTitle }) {
  const response = await fetchPost({
    url: `/${address.userApiUrl}/room`,
    data: {
      title: roomTitle,
      userId,
    },
  });
  return response;
}

async function fetchGet({ url }) {
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson;
}

async function fetchRooms({ userId }) {
  const response = await fetchGet({
    url: `/${address.userApiUrl}/${userId}/rooms`,
  });
  return response;
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

async function fetchChoose(roomNumber, quizIndex, choose) {
  // url 양식 : /room/:roomNumber/quiz/:quizIndex/choose/:choose
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.quiz}/${quizIndex}/${address.choose}/${choose}`;
  const response = await fetchPost({
    url,
  });
  return response;
}

async function fetchCheckAnswer(roomNumber, nickname, quizIndex, choose) {
  // url 양식 : /room/:roomNumber/player/:nickname/quiz/:quizIndex/choose/:choose
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.player}/${nickname}/${address.quiz}/${quizIndex}/${address.choose}/${choose}`;
  const response = await fetchPost({
    url,
  });
  return response;
}

async function fetchRank(roomNumber, nickname) {
  // url 양식 : /room/:roomNumber/player/:nickname/result
  const url = `/${address.roomApiUrl}/${roomNumber}/${address.player}/${nickname}/${address.result}`;
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
  fetchCheckAnswer,
  fetchRank,
  fetchRooms,
  addRoom,
};
