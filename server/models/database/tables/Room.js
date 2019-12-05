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
      `SELECT r.title, r.id FROM ${roomTable} r LEFT JOIN ${userTable} u ON r.user_id=u.id WHERE u.email=?`,
      userId,
    );
  }

  getRoomTitle(roomId) {
    return this.query(`SELECT title FROM ${roomTable} WHERE id=?`, roomId);
  }

  updateRoom(roomId, title) {
    return this.query(
      `UPDATE ${roomTable} SET title=? WHERE id=?`,
      title,
      roomId,
    );
  }
}

module.exports = Room;
