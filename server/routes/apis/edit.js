const express = require('express');
const multer = require('multer');

const upload = multer();
const router = express.Router();

const dbManager = require('../../models/database/dbManager');
const objectStorage = require('../../objectStorage');

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

function getImagePath(roomId, quizId, originalname) {
  const filename = encodeURIComponent(originalname)
    .replace(/[!'()]/g, escape)
    .replace(/\*/g, '%2A');
  return `https://kr.object.ncloudstorage.com/pickyforky/images/${roomId}/${quizId}/${filename}`;
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

router.post('/quiz', upload.single('file'), async (req, res) => {
  const { roomId, quizsetId, title, quizOrder, score, timeLimit } = req.body;
  const { data, isError } = await dbManager.quiz.createQuiz(quizsetId, {
    title,
    quizOrder,
    score,
    timeLimit,
  });
  const isSuccess = isError === undefined;
  if (!isSuccess) {
    res.json({
      isSuccess,
    });
    return;
  }
  const quizId = data.insertId;
  const { file } = req;
  if (file !== undefined) {
    const { buffer, originalname } = file;
    await objectStorage.uploadImage(roomId, quizId, originalname, buffer);
    const newImagePath = getImagePath(roomId, quizId, originalname);
    await dbManager.quiz.updateImagePath(quizId, newImagePath);
  }
  res.json({
    isSuccess,
    data: {
      quizId,
    },
  });
});

router.put('/quiz', upload.single('file'), async (req, res) => {
  const { roomId, id, title, quizOrder, score, timeLimit } = req.body;
  const { file } = req;
  const { isError } = await dbManager.quiz.updateQuiz({
    id,
    title,
    quizOrder,
    score,
    timeLimit,
  });
  const isSuccess = isError === undefined;
  if (file !== undefined) {
    const { buffer, originalname } = file;
    await objectStorage.uploadImage(roomId, id, originalname, buffer);
    const newImagePath = getImagePath(roomId, id, originalname);
    await dbManager.quiz.updateImagePath(id, newImagePath);
  }
  res.json({
    isSuccess,
  });
});

router.delete('/quiz', async (req, res) => {
  const { roomId, quizId } = req.body;
  const { isError } = await dbManager.quiz.deleteQuiz(quizId);
  await objectStorage.deleteQuizFolder(roomId, quizId);
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
