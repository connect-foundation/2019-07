const Table = require('./Table');
const { userTable } = require('../../../constants/tableName');

require('dotenv').config();

class User extends Table {
  /**
   * 메소드 가이드라인
   *
   * method() {
   *   return this.query(query, params);
   * }
   */

  insertUser({ email }) {
    return this.query(
      `INSERT INTO ${process.env.DB_DATABASE}.${userTable} (email) VALUES ('${email}')`,
    );
  }

  selectAllUser() {
    return this.query(`select id, email from ${userTable}`);
  }
}

module.exports = User;
