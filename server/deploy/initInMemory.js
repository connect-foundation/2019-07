const inMemory = require('../models/inMemory');
const { getRoomTemplates, getUserTemplates } = require('../models/templates');

function initInMemory() {
  const tempRoom = getRoomTemplates();
  const tempRoom2 = getRoomTemplates();

  const user1 = getUserTemplates();
  const user2 = getUserTemplates();
  const user3 = getUserTemplates();
  const user4 = getUserTemplates();

  user1.nickname = 'vanilla';
  user2.nickname = 'fake';
  user3.nickname = 'jjang';
  user4.nickname = 'bling';

  tempRoom.roomNumber = '111111';
  tempRoom.userList.push(user1);
  tempRoom.userList.push(user2);

  tempRoom2.roomNumber = '222222';
  tempRoom.userList.push(user3);
  tempRoom.userList.push(user4);
  inMemory.pushRoom(tempRoom);
  inMemory.pushRoom(tempRoom2);
}

module.exports = initInMemory;
