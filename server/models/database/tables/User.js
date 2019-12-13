const Table = require('./Table');
const { userTable } = require('../../../constants/tableName');

class User extends Table {
  insertUser({ id }) {
    return this.query(`INSERT INTO ${userTable} (naver_id) VALUES ('${id}')`);
  }

  selectAllUser() {
    return this.query(`select id, naver_id from ${userTable}`);
  }
}

module.exports = User;
