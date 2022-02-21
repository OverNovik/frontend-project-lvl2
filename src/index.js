import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filepath) => JSON.parse(readFileSync(path.resolve(process.cwd(), filepath.trim()), 'utf-8'));

const genDiff = (filepath1, filepath2) => {
  console.log(readFile(filepath1))
  console.log(readFile(filepath2));
};

export default genDiff;
