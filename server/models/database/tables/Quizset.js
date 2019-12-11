const Table = require('./Table');
const {
  quizTable,
  quizsetTable,
  itemTable,
} = require('../../../constants/tableName');

class Quizset extends Table {
  getQuizset(roomId) {
    const select = `SELECT Q.title AS quizTitle, Q.score, Q.time_limit, Q.image_path, I.title AS itemTitle, I.item_order, I.is_answer`;
    const from = `FROM ${quizTable} AS Q JOIN ${itemTable} AS I ON Q.id = I.quiz_id`;
    const where = `WHERE quizset_id = (SELECT QS.id FROM ${quizsetTable} AS QS WHERE QS.room_id = ?)`;
    const query = `${select} ${from} ${where};`;

    return this.query(query, roomId);
  }

  createQuizset(roomId, quizset) {
    const { title, quizsetOrder } = quizset;
    const insert = `INSERT INTO ${quizsetTable} (title, quizset_order, room_id)`;
    const values = `VALUES (?, ?, ?)`;
    const query = `${insert} ${values}`;
    return this.query(query, title, quizsetOrder, roomId);
  }

  readLastQuizsetId(roomId) {
    const select = `SELECT id`;
    const from = `FROM ${quizsetTable}`;
    const where = `WHERE room_id = ?`;
    const orderBy = `ORDER BY id DESC LIMIT 1`;
    const query = `${select} ${from} ${where} ${orderBy};`;
    return this.query(query, roomId);
  }
}

module.exports = Quizset;
