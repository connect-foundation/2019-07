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
    url: `${address.roomApiUrl}/${roomNumber}`,
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchGet({
    url: `${address.roomApiUrl}/${roomNumber}/${nickname}`,
  });
  return response;
}

async function fetchToken(data) {
  const response = await fetchPost({
    url: address.setJWT,
    data: { data },
  });
  return response;
}

export { fetchRoomNumber, fetchNickname, fetchToken };
