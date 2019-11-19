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

async function fetchRoomNumber(roomNumber) {
  const response = await fetchPost({
    url: '/room/checkRoomNumber',
    data: { roomNumber },
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchPost({
    url: 'user/setNickname',
    data: { nickname, roomNumber },
  });
  return response;
}

export { fetchRoomNumber, fetchNickname };
