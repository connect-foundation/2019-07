async function fetchPost({ url, data, method = 'POST' }) {
  const response = await fetch(url, {
    method,
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

async function addRoom({ userId, roomTitle }) {
  const response = await fetchPost({
    url: `/api/user/room`,
    data: {
      title: roomTitle,
      userId,
    },
  });
  return response;
}

async function updateRoomTitle({ roomId, title }) {
  const response = await fetchPost({
    url: `/api/user/room`,
    data: {
      roomId,
      title,
    },
    method: 'PUT',
  });
  return response;
}

async function deleteRoom({ roomId }) {
  const response = await fetchPost({
    url: `/api/user/room`,
    data: {
      roomId,
    },
    method: 'DELETE',
  });
  return response;
}

async function fetchRooms({ userId }) {
  const response = await fetchGet({
    url: `/api/user/${userId}/rooms`,
  });
  return response;
}

async function fetchRoomTitle({ roomId }) {
  const response = await fetchGet({
    url: `/api/user/room/${roomId}`,
  });
  return response;
}

async function readAnswer(roomNumber, nickname, quizIndex, choose) {
  const url = `/api/room/player/choose/check`;
  const response = await fetchPost({
    url,
    data: {
      roomNumber,
      nickname,
      quizIndex,
      choose,
    },
  });
  return response;
}

async function fetchRoomNumber(roomNumber) {
  const response = await fetchGet({
    url: `/api/room/${roomNumber}`,
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchGet({
    url: `/api/room/${roomNumber}/name/${nickname}`,
  });
  return response;
}

async function fetchQuizSet(roomNumber) {
  const response = await fetchGet({
    url: `/api/room/${roomNumber}/quiz`,
  });
  return response;
}

async function readRank(roomNumber, nickname) {
  const url = `/api/room/${roomNumber}/player/${nickname}/result`;
  const response = await fetchGet({
    url,
  });
  return response;
}

async function getToken(data) {
  const response = await fetchGet({
    url: `/api/login/token/${data.access_token}`,
  });
  return response;
}

async function readQuizsetId(roomId) {
  const url = `/api/user/quizset/${roomId}`;
  const response = await fetchGet({ url });
  return response;
}

async function createQuizset(roomId, quizsetTitle, quizsetOrder) {
  const url = `/api/edit/quizset`;
  const response = await fetchPost({
    url,
    data: { roomId, quizsetTitle, quizsetOrder },
  });
  return response;
}

async function readQuizset(quizsetId) {
  const url = `/api/edit/quizset/${quizsetId}`;
  const response = await fetchGet({ url });
  return response;
}

async function fetchForm({ data, method }) {
  const url = `/api/edit/quiz`;
  const response = await fetch(url, {
    method,
    body: data,
  });
  const responseJson = await response.json();
  return responseJson;
}

async function createQuiz(formData) {
  const response = await fetchForm({
    data: formData,
    method: 'POST',
  });
  return response;
}

async function updateQuiz(formData) {
  const response = await fetchForm({
    data: formData,
    method: 'PUT',
  });
  return response;
}

async function createItems(quizId, items) {
  const url = `/api/edit/items`;
  const response = await fetchPost({ url, data: { quizId, items } });
  return response;
}

async function updateItem(item) {
  const url = `/api/edit/item`;
  const response = await fetchPost({
    url,
    data: { item },
    method: 'PUT',
  });
  return response;
}

async function deleteQuiz(roomId, quizId) {
  const url = `/api/edit/quiz`;
  const response = await fetchPost({
    url,
    data: { roomId, quizId },
    method: 'DELETE',
  });
  return response;
}

export {
  fetchRoomNumber,
  fetchNickname,
  getToken,
  fetchQuizSet,
  readAnswer,
  readRank,
  fetchRooms,
  fetchRoomTitle,
  addRoom,
  updateRoomTitle,
  readQuizsetId,
  createQuizset,
  readQuizset,
  createQuiz,
  updateQuiz,
  createItems,
  updateItem,
  deleteQuiz,
  deleteRoom,
};
