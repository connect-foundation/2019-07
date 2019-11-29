const dao = require('../dao');

async function test() {
  const data = await dao.selectQuizSet();

  console.log(data);
}

test();
