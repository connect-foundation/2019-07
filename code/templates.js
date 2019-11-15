function getRoomTemplates() {
  return {
    roomNumber: 0,
    userList: [],
  };
}

function getUserTemplates() {
  return {
    nickname: '',
    score: 0,
  };
}

module.exports = {
  getRoomTemplates,
  getUserTemplates,
};
