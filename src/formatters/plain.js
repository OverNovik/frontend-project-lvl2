import pkg from 'lodash';

const { isObject, isString } = pkg;

const transform = (value) => {
  if (!isObject(value)) {
    return value;
  }

  if (isString(value)) {
    return `${value}`;
  }

  return '[complex value]';
};

const plain = (diff) => {
  const iterArr = (arr, path) => arr.map((item) => {
    let result;

    if (item.diffState === 'added') {
      result = `Property '${path + item.key}' was added with value: ${transform(item.value)}`;
    }

    if (item.diffState === 'removed') {
      result = `Property '${path + item.key}' was removed`;
    }

    if (item.diffState === 'updated') {
      result = `Property '${path + item.key}' was updated. From ${transform(item.value)} to ${transform(item.value2)}`;
    }

    if (item.diffState === 'children') {
      result = `${iterArr(item.children, `${path + item.key}`)}`;
    }

    if (item.diffState === 'withoutChanges') {
      result = '';
    }

    return result.join('\n');
  });

  return iterArr(diff, '');
};

export default plain;
