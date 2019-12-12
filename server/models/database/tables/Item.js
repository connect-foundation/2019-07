const Table = require('./Table');
const { itemTable, quizTable } = require('../../../constants/tableName');

class Item extends Table {
  createItems(quizId, items) {
    const itemValues = items.reduce((array, item) => {
      const { title, itemOrder, isAnswer } = item;
      return [...array, [title, itemOrder, quizId, isAnswer]];
    }, []);
    const insert = `INSERT INTO ${itemTable} (title, item_order, quiz_id, is_answer)`;
    const values = `VALUES ?`;
    const query = `${insert} ${values};`;
    return this.query(query, itemValues);
  }

  readItems(quizsetId) {
    const select = `SELECT id, title, item_order, quiz_id, is_answer`;
    const from = `FROM ${itemTable}`;
    const where = `WHERE quiz_id IN (SELECT id FROM ${quizTable} WHERE quizset_id = ?)`;
    const query = `${select} ${from} ${where};`;
    return this.query(query, quizsetId);
  }

  updateItem(item) {
    const { id, title, isAnswer } = item;
    const update = `UPDATE ${itemTable}`;
    const set = `SET title = ?, is_answer = ?`;
    const where = `WHERE id = ?`;
    const query = `${update} ${set} ${where}`;
    return this.query(query, title, isAnswer, id);
  }
}

module.exports = Item;
