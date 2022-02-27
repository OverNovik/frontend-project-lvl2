import { readFileSync } from 'fs';
import path from 'path';
import parser from './parser.js';
import formatters from './formatters/index.js';
import findDiff from './finddiff.js';

const readFile = (filepath) => readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8');

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = parser(readFile(filepath1), path.extname(filepath1));
  const file2 = parser(readFile(filepath2), path.extname(filepath2));

  const diff = findDiff(file1, file2);
  const result = formatters(formatName, diff);

  console.log(result);
  return result;
};

export default genDiff;
