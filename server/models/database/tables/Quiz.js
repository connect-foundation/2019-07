const Table = require('./Table');
const { quizTable } = require('../../../constants/tableName');

class Quiz extends Table {
  createQuiz(quizsetId, quiz) {
    const { title, quizOrder, score, timeLimit } = quiz;
    const insert = `INSERT INTO ${quizTable} (title, quiz_order, score, time_limit, quizset_id)`;
    const values = `VALUES (?, ?, ?, ?, ?)`;
    const query = `${insert} ${values};`;
    return this.query(query, title, quizOrder, score, timeLimit, quizsetId);
  }

  updateQuiz(quiz) {
    const { id, title, quizOrder, score, timeLimit } = quiz;
    const update = `UPDATE ${quizTable}`;
    const set = `SET title = ?, quiz_order = ?, score = ?, time_limit = ?`;
    const where = `WHERE id = ?`;
    const query = `${update} ${set} ${where};`;
    return this.query(query, title, quizOrder, score, timeLimit, id);
  }

  readQuizzes(quizsetId) {
    const select = `SELECT id, title, quiz_order, score, time_limit, image_path`;
    const from = `FROM ${quizTable}`;
    const where = `WHERE quizset_id = ?`;
    const query = `${select} ${from} ${where};`;
    return this.query(query, quizsetId);
  }

  deleteQuiz(quizId) {
    const query = `DELETE FROM ${quizTable} WHERE id = ?;`;
    return this.query(query, quizId);
  }

  updateImagePath(quizId, imagePath) {
    const update = `UPDATE ${quizTable}`;
    const set = `SET image_path = ?`;
    const where = `WHERE id = ?`;
    const query = `${update} ${set} ${where};`;
    return this.query(query, imagePath, quizId);
  }
}

module.exports = Quiz;
