import pkg from 'lodash';

const { isObject, isString } = pkg;

const transform = (value) => {
  if (isString(value)) {
    return `'${value}'`;
  }

  if (!isObject(value)) {
    return value;
  }

  return '[complex value]';
};

const plain = (diff) => {
  const iterArr = (arr, path) => arr.map((item) => {
    if (item.diffState === 'added') {
      return `Property '${path + item.key}' was added with value: ${transform(item.value)}`;
    }

    if (item.diffState === 'removed') {
      return `Property '${path + item.key}' was removed`;
    }

    if (item.diffState === 'updated') {
      return `Property '${path + item.key}' was updated. From ${transform(item.value)} to ${transform(item.value2)}`;
    }

    if (item.diffState === 'children') {
      return `${iterArr(item.children, `${path + item.key}.`)}`;
    }

    return null;
  }).filter((item) => item).join('\n');

  return iterArr(diff, '');
};

export default plain;
