const Table = require('./Table');
const { roomTable, userTable } = require('../../../constants/tableName');

class Room extends Table {
  selectRooms(userId) {
    return this.query(
      `SELECT r.title, r.id FROM ${roomTable} r LEFT JOIN ${userTable} u ON r.user_id=u.id WHERE u.email=?`,
      userId,
    );
  }
}

module.exports = Room;
