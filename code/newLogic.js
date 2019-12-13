async setQuizSet(roomNumber, roomId) {
  const { data } = await dbManager.quizset.getQuizset(roomId);

  const quizset = [];
  const previousArray = [];
  let quizIndex = -1;

  data.forEach((currentValue) => {
    if (!previousArray.find((element) => element === currentValue.id)) {
      const currentQuiz = quizTemplate();
      currentQuiz.title = currentValue.quizTitle;
      currentQuiz.score = currentValue.score;
      currentQuiz.timeLimit = currentValue.time_limit;
      currentQuiz.image = currentValue.image_path;

      quizset.push(currentQuiz);
      previousArray.push(currentValue.id);
      quizIndex += 1;
    }

    const currentItem = itemTemplate();
    currentItem.title = currentValue.itemTitle;
    quizset[quizIndex].items.push(currentItem);
    if (currentValue.is_answer === 1) {
      quizset[quizIndex].answers.push(currentValue.item_order);
    }
  });
  this.getRoom(roomNumber).quizSet = quizset;
}