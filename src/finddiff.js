import pkg from 'lodash';

const {
  sortBy, has, isEqual, isObject, keys,
} = pkg;

const findDiff = (file1, file2) => {
  const filesKeys = sortBy(keys({ ...file1, ...file2 }));

  const diff = filesKeys.reduce((acc, key) => {
    if (!has(file1, key)) {
      return [
        ...acc,
        {
          key,
          value: file2[key],
          diffState: 'added',
        },
      ];
    }

    if (!has(file2, key)) {
      return [
        ...acc,
        {
          key,
          value: file1[key],
          diffState: 'removed',
        },
      ];
    }

    if (isObject(file1[key]) && isObject(file2[key])) {
      return [
        ...acc,
        {
          key,
          children: findDiff(file1[key], file2[key]),
          diffState: 'children',
        },
      ];
    }

    if (!isEqual(file1[key], file2[key])) {
      return [
        ...acc,
        {
          key,
          value: file1[key],
          value2: file2[key],
          diffState: 'updated',
        },
      ];
    }

    return [
      ...acc,
      {
        key,
        value: file1[key],
        diffState: 'withoutChanges',
      },
    ];
  }, []);

  return diff;
};

export default findDiff;
