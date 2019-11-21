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

async function fetchRoomNumber(roomNumber) {
  const response = await fetchPost({
    url: address.checkRoomNumber,
    data: { roomNumber },
  });
  return response;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetchPost({
    url: address.setNickname,
    data: { nickname, roomNumber },
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
