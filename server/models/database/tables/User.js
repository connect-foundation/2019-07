const Table = require('./Table');
const { userTable } = require('../../../constants/tableName');

class User extends Table {
  insertUser({ email }) {
    return this.query(`INSERT INTO ${userTable} (email) VALUES ('${email}')`);
  }

  selectAllUser() {
    return this.query(`select id, email from ${userTable}`);
  }
}

module.exports = User;
