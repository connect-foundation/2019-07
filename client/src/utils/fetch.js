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
    url: `/user/room`,
    data: {
      title: roomTitle,
      userId,
    },
  });
  return response;
}

async function updateRoomTitle({ roomId, title }) {
  const response = await fetchPost({
    url: `/user/room`,
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
    url: `/user/room`,
    data: {
      roomId,
    },
    method: 'DELETE',
  });
  return response;
}

async function fetchRooms({ userId }) {
  const response = await fetchGet({
    url: `/user/${userId}/rooms`,
  });
  return response;
}

async function fetchRoomTitle({ roomId }) {
  const response = await fetchGet({
    url: `/user/room/${roomId}`,
  });
  return response;
}

async function fetchRoomNumber(roomNumber) {
  const response = await fetchGet({
    url: `/room/${roomNumber}`,
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchGet({
    url: `/room/${roomNumber}/name/${nickname}`,
  });
  return response;
}

async function fetchQuizSet(roomNumber) {
  const response = await fetchGet({
    url: `/room/${roomNumber}/quiz`,
  });
  return response;
}

async function fetchChoose(roomNumber, quizIndex, choose) {
  const url = `/room/player/choose`;
  const response = await fetchPost({
    url,
    data: {
      roomNumber,
      quizIndex,
      choose,
    },
  });
  return response;
}

async function fetchCheckAnswer(roomNumber, nickname, quizIndex, choose) {
  const url = `/room/player/choose/check`;
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

async function fetchRank(roomNumber, nickname) {
  const url = `/room/${roomNumber}/player/${nickname}/result`;
  const response = await fetchGet({
    url,
  });
  return response;
}

async function fetchToken(data) {
  const response = await fetchGet({
    url: `/login/token/${data.access_token}`,
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
  updateRoomTitle,
  deleteRoom,
};
