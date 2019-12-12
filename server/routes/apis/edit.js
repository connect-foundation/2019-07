const express = require('express');

const router = express.Router();

const dbManager = require('../../models/database/dbManager');

function getQuizset(quizzes, items) {
  function pushQuiz(quizset, quiz) {
    const matchedItems = items.filter(item => item.quiz_id === quiz.id);
    const newQuiz = {
      ...quiz,
      items: matchedItems,
    };
    return [...quizset, newQuiz];
  }

  return quizzes.reduce(pushQuiz, []);
}

router.get('/quizset/:quizsetId', async (req, res) => {
  const { quizsetId } = req.params;
  const quizzes = await dbManager.quiz.readQuizzes(quizsetId);
  const items = await dbManager.item.readItems(quizsetId);
  const isSuccess = !quizzes.isError && !items.isError;
  if (isSuccess) {
    res.json({
      isSuccess,
      data: {
        quizset: getQuizset(quizzes.data, items.data),
      },
    });
    return;
  }
  res.json({
    isSuccess,
  });
});

router.post('/quizset', async (req, res) => {
  const { roomId, quizsetTitle, quizsetOrder } = req.body;
  const { data, isError } = await dbManager.quizset.createQuizset(
    roomId,
    quizsetTitle,
    quizsetOrder,
  );
  const isSuccess = isError === undefined;
  if (!isSuccess) {
    res.json({
      isSuccess,
    });
    return;
  }
  res.json({
    isSuccess,
    data: {
      quizsetId: data.insertId,
    },
  });
});

router.post('/quiz', async (req, res) => {
  const { quizsetId, quiz } = req.body;
  const { data, isError } = await dbManager.quiz.createQuiz(quizsetId, quiz);
  const isSuccess = isError === undefined;
  if (!isSuccess) {
    res.json({
      isSuccess,
    });
    return;
  }
  res.json({
    isSuccess,
    data: {
      quizId: data.insertId,
    },
  });
});

router.put('/quiz', async (req, res) => {
  const { quiz } = req.body;
  const { isError } = await dbManager.quiz.updateQuiz(quiz);
  const isSuccess = isError === undefined;
  res.json({
    isSuccess,
  });
});

router.delete('/quiz', async (req, res) => {
  const { quizId } = req.body;
  const { isError } = await dbManager.quiz.deleteQuiz(quizId);
  const isSuccess = isError === undefined;
  res.json({
    isSuccess,
  });
});

router.post('/items', async (req, res) => {
  const { quizId, items } = req.body;
  const { isError } = await dbManager.item.createItems(quizId, items);
  const isSuccess = isError !== undefined;
  res.json({
    isSuccess,
  });
});

router.put('/item', async (req, res) => {
  const { item } = req.body;
  const { isError } = await dbManager.item.updateItem(item);
  const isSuccess = isError === undefined;
  res.json({
    isSuccess,
  });
});

module.exports = router;
