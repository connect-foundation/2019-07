const Table = require('./Table');
const { roomTable, userTable } = require('../../../constants/tableName');

/**
 * Database에서 유저가 생성한 방을 Database와 연동해 관리하는 클래스입니다.
 * 프론트에서 받아올 수 있는 값은 email을 받아올 수 있고,
 * Room Table은 user가 가입 시 기본 생성된 id값을 참조해 방의 정보를 저장하고 있어
 * User의 Table과 JOIN 등을 통해 값을 읽어오고, 저장하고 있습니다.
 */

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
