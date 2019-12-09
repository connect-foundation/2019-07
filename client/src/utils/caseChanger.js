const ASCII_A = 65;
const ASCII_Z = 90;
const CAN_STRING_VALUE_CHANGE_DEFAULT = false;

function parseCamelString(string) {
  const splitSnakeWord = string.split('_');
  if (splitSnakeWord.length < 2) return string;

  return splitSnakeWord.reduce((result, now, index) => {
    if (index === 0) return now;
    if (now.length === 0) return result;
    const camel = now.charAt(0).toUpperCase() + now.substring(1);
    return result + camel;
  }, '');
}

function parseSnakeString(string) {
  const splitWord = string.split('');
  return splitWord.reduce((result, now, index) => {
    const nowAscii = now.charCodeAt(0);
    if (nowAscii < ASCII_A || nowAscii > ASCII_Z) return result + now;
    const snake = index > 0 ? '_' : '';
    return result + snake + now.toLowerCase();
  }, '');
}

function parseObjectFunction(
  object,
  parseCaseString,
  option = { canStringValueChange: CAN_STRING_VALUE_CHANGE_DEFAULT },
) {
  if (option.canStringValueChange && typeof object === 'string')
    return parseCaseString(object);
  if (!object || typeof object !== 'object') return object;
  const newObject = Array.isArray(object) ? [] : {};

  Object.keys(object).forEach(key => {
    const parsedKey = parseCaseString(key) || key;
    const value = object[key];
    newObject[parsedKey] = parseObjectFunction(value, parseCaseString, option);
  });
  return newObject;
}

function parseCamelObject(object, option) {
  return parseObjectFunction(object, parseCamelString, option);
}

function parseSnakeObject(object, option) {
  return parseObjectFunction(object, parseSnakeString, option);
}

export { parseCamelObject, parseSnakeObject };
