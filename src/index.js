import { readFileSync } from 'fs';
import path from 'path';
import pkg from 'lodash';
import parser from './parser.js';

const { sortBy, has, isEqual } = pkg;

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');

const genDiff = (filepath1, filepath2) => {
  const file1 = parser(readFile(filepath1), path.extname(filepath1));
  const file2 = parser(readFile(filepath2), path.extname(filepath2));
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
  const result = `{\n${visual.join('\n')}\n}`;

  console.log(result);
  return result;
};

export default genDiff;
