import pkg from 'lodash';

const { entries, isObject } = pkg;

const indent = (amount) => ' '.repeat(amount);

const toString = (value, spaces) => {
  if (!isObject(value)) {
    return `${value}`;
  }

  const visual = entries(value).map(([key, itemValue]) => `${indent((4 * spaces) + 2)}  ${key}: ${toString(itemValue, spaces + 1)}`);
  const result = visual.join('\n');

  return `{\n${result}\n${indent(4 * spaces)}}`;
};

const stylish = (diff, defaultSpaces = 1) => {
  const iterArr = (arr, spaces) => arr.map((item) => {
    if (item.diffState === 'added') {
      return `\n${indent((4 * spaces) - 2)}+ ${item.key}: ${toString(item.value, spaces)}`;
    }

    if (item.diffState === 'removed') {
      return `\n${indent((4 * spaces) - 2)}- ${item.key}: ${toString(item.value, spaces)}`;
    }

    if (item.diffState === 'updated') {
      return `\n${indent((4 * spaces) - 2)}- ${item.key}: ${toString(item.value, spaces)}\n`
      + `${indent((4 * spaces) - 2)}+ ${item.key}: ${toString(item.value2, spaces)}`;
    }

    if (item.diffState === 'children') {
      return `\n${indent(4 * spaces)}${item.key}: {${iterArr(item.children, spaces + 1)}\n${indent(4 * spaces)}}`;
    }

    return `\n${indent(4 * spaces)}${item.key}: ${toString(item.value, spaces)}`;
  }).join('');

  return `{${iterArr(diff, defaultSpaces)}\n}`;
};

export default stylish;
