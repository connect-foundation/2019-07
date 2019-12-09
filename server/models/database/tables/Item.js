const Table = require('./Table');
const { itemTable } = require('../../../constants/tableName');

class Item extends Table {
  /**
   * 메소드 가이드라인
   *
   * method() {
   *   return this.query(query, params);
   * }
   */

  insertItem({ item }) {
    /**
     * item{
     *   title: (string) 항목의 명칭
     *   item_order: (int, 0~3) 아이템의 순서
     *   quiz_id: (int) 속한 퀴즈의 id
     *   is_answer: (bool) 정답인지 여부
     * }
     *
     */

    return this.query(query, params);
  }
}

module.exports = Item;
