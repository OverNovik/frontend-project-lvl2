import { readFileSync } from 'fs';
import path from 'path';
import { sortBy, has, isEqual } from 'lodash';

const readFile = (filepath) => JSON.parse(readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8'));

const genDiff = (filepath1, filepath2) => {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const filesKeys = sortBy(Object.keys({ ...file1, ...file2 }));

  const diff = filesKeys.reduce((acc, key) => {
    if (!has(file1, key)) {
      return [
        ...acc,
        {
          key: `+ ${key}`,
          value: file2[key],
        },
      ];
    }

    if (!has(file2, key)) {
      return [
        ...acc,
        {
          key: `- ${key}`,
          value: file1[key],
        },
      ];
    }

    if (!isEqual(file1[key], file2[key])) {
      return [
        ...acc,
        {
          key: `- ${key}`,
          value: file1[key],
        },
        {
          key: `+ ${key}`,
          value: file2[key],
        },
      ];
    }

    return [
      ...acc,
      {
        key: `  ${key}`,
        value: file1[key],
      },
    ];
  }, []);

  const visual = diff.map((item) => ` ${item.key}: ${item.value}`);
  const spaces = `{\n${visual.join('\n')}\n}`;
  // console.log(file1);
  // console.log(file2);
  // console.log(filesKeys);
  console.log(spaces);
};

export default genDiff;
