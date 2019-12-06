import * as address from '../constants/apiAddresses';

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

async function fetchRoomTitle({ roomId }) {
  const response = await fetchGet({
    url: `/user/room/${roomId}`,
  });
  return response;
}

//...
