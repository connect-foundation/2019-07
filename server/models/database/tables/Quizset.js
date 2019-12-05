const Table = require('./Table');
const {
  quizTable,
  quizsetTable,
  itemTable,
} = require('../../../constants/tableName');

class Quizset extends Table {
  getQuizset(roomId) {
    const select = `SELECT Q.title AS quizTitle, Q.score, Q.time_limit, Q.image_path, I.title AS itemTitle, I.order, I.is_answer`;
    const from = `FROM ${quizTable} AS Q JOIN ${itemTable} AS I ON Q.id = I.quiz_id`;
    const where = `WHERE quizset_id = (SELECT QS.id FROM ${quizsetTable} AS QS WHERE QS.room_id = ?)`;
    const query = `${select} ${from} ${where};`;

    return this.query(query, roomId);
  }
}

module.exports = Quizset;
