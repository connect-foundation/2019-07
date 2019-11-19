async function fetchRoomNumber(roomNumber) {
  const response = await fetch('room/checkRoomNumber', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ roomNumber }),
    credentials: 'include',
  });
  const responseJson = await response.json();
  return responseJson;
}

async function fetchNickname(nickname, roomNumber) {
  const response = await fetch('user/setNickname', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nickname, roomNumber }),
    credentials: 'include',
  });
  const responseJson = await response.json();
  return responseJson;
}

export { fetchRoomNumber, fetchNickname };
