const Table = require('./Table');
const { roomTable, userTable } = require('../../../constants/tableName');

class Room extends Table {
  insertRoom(naverId, title) {
    return this.query(
      `INSERT INTO ${roomTable} (title, user_id) VALUES (?, (SELECT id FROM ${userTable} WHERE naver_id=?))`,
      title,
      naverId,
    );
  }

  selectRooms(naverId) {
    return this.query(
      `SELECT R.title, R.id FROM ${roomTable} R LEFT JOIN ${userTable} U ON R.user_id=U.id WHERE U.naver_id=?`,
      naverId,
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
