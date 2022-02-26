import pkg from 'lodash';

const {
  sortBy, has, isEqual, isObject,
} = pkg;

const findDiff = (file1, file2) => {
  const filesKeys = sortBy(Object.keys({ ...file1, ...file2 }));

  const diff = filesKeys.reduce((acc, key) => {
    if (!has(file1, key)) {
      return [
        ...acc,
        {
          key,
          value: file2[key],
        },
      ];
    }

    if (!has(file2, key)) {
      return [
        ...acc,
        {
          key,
          value: file1[key],
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
        },
      ];
    }

    if (isObject(file1[key]) && isObject(file2[key])) {
      return [
        ...acc,
        {
          key,
          children: diff(file1[key], file2[key]),
        },
      ];
    }

    return [
      ...acc,
      {
        key,
        value: file1[key],
      },
    ];
  }, []);

  return diff;
};

export default findDiff;
