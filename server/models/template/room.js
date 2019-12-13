/**
 * 기존에 배열 형태로 방의 정보를 저장하고 있는 인메모리 DB의 구조를 Map 형태로 변경하였습니다.
 * 기존의 경우 배열에서 방의 번호를 찾고, 그 안에서 nickname이 동일한 유저를 찾는데 시간 복잡도가 높아
 * Map 형태로 변경하여 방의 번호를 key, 아래 template을 value로 갖는 구조로 변경하였습니다.
 * rooms.js 파일에서 이러한 형태의 인메모리 DB를 이용하고 있습니다.
 */

// 기존 형태
const roomTemplate = () => ({
  roomNumber: '',
  players: [],
  hostId: '',
  package: [],
  currentQuizIndex: -1,
  quizSet: [],
});

// 변경된 형태
const roomTemplate = () => ({
  players: new Map(),
  hostId: '',
  quizSet: [],
});

module.exports = {
  roomTemplate,
};
