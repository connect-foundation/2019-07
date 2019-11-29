const quizData = require('../../deploy/dummy');

async function selectQuizSet() {
  let data;
  await new Promise((resolve) => {
    setTimeout(async () => {
      data = quizData;
      resolve(data);
    }, 10);
  });
  return data;
}

class Dao {}

const dao = new Dao();
dao.selectQuizSet = selectQuizSet;

module.exports = dao;
