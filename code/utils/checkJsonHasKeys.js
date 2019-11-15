/**
 * req.body에 key가 있는지 검사
 * @param {string} body : request.body
 * @param {List} keys : body가 갖고 있는지 검사하고 싶은 key들
 */
function checkJsonHasKeys(body, keys) {
  return !keys.find((element) => body[element] === undefined);
}

module.exports = checkJsonHasKeys;
