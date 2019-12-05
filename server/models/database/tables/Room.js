const Table = require('./Table');
const { roomTable, userTable } = require('../../../constants/tableName');

class Room extends Table {
  insertRoom(userId, title) {
    return this.query(
      `INSERT INTO ${roomTable} (title, user_id) VALUES (?, (SELECT id FROM ${userTable} WHERE email=?))`,
      title,
      userId,
    );
  }

  selectRooms(userId) {
    return this.query(
      `SELECT R.title, R.id FROM ${roomTable} R LEFT JOIN ${userTable} U ON R.user_id=U.id WHERE U.email=?`,
      userId,
    );
  }
}

module.exports = Room;
