const Table = require('./Table');

class User extends Table {
  /**
   * 메소드 가이드라인
   *
   * method() {
   *   return this.query(query, params);
   * }
   */

  selectAllUser() {
    return this.query('select * from user');
  }
}

module.exports = User;
