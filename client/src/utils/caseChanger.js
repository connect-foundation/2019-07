const LOWER_UPPER_GAP = 32;
const ASCII_A = 65;
const ASCII_Z = 90;
const CAN_STRING_VALUE_CHANGE_DEFAULT = true;

function lowercaseToUppercase(lowercase) {
  const lowerCaseCode = lowercase.charCodeAt(0);
  const upperCase = String.fromCharCode(lowerCaseCode - LOWER_UPPER_GAP);
  return upperCase;
}

function uppercaseToLowercase(uppercase) {
  const upperCaseCode = uppercase.charCodeAt(0);
  const lowerCase = String.fromCharCode(upperCaseCode + LOWER_UPPER_GAP);
  return lowerCase;
}

function parseCamelString(string) {
  const splitedString = string.split('_');
  if (splitedString.length < 2) return string;

  return splitedString.reduce((result, now, index) => {
    if (index === 0) return now;
    if (now.length === 0) return result;
    const camel = lowercaseToUppercase(now) + now.substring(1);
    return result + camel;
  }, '');
}

function parseSnakeString(string) {
  const array = string.split('');
  return array.reduce((result, now, index) => {
    const nowAscii = now.charCodeAt(0);
    if (nowAscii < ASCII_A || nowAscii > ASCII_Z) return result + now;
    const snake = index > 0 ? '_' : '';
    return result + snake + uppercaseToLowercase(now);
  }, '');
}

function parseObjectFunction(object, parseCaseString, option) {
  const canStringValueChange = option
    ? option.canStringValueChange
    : CAN_STRING_VALUE_CHANGE_DEFAULT;
  if (canStringValueChange && typeof object === 'string')
    return parseCaseString(object);
  if (!object || typeof object !== 'object') return object;

  const newObject = Array.isArray(object) ? [] : {};
  const keys = Object.keys(object);

  for (let index = 0; index < keys.length; index += 1) {
    const key = keys[index];
    const parsedKey = parseCaseString(key) || key;
    const value = object[key];
    newObject[parsedKey] = parseObjectFunction(value, parseCaseString, option);
  }
  return newObject;
}

function parseCamelObject(object, option) {
  return parseObjectFunction(object, parseCamelString, option);
}

function parseSnakeObject(object, option) {
  return parseObjectFunction(object, parseSnakeString, option);
}

export { parseCamelObject, parseSnakeObject };
