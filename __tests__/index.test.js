import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath1 = path.join(__dirname, '../', '__fixtures__/file1.json');
const filepath2 = path.join(__dirname, '../', '__fixtures__/file2.json');

test('test genDiff function', () => {
  expect(genDiff(filepath1, filepath2)).toBe(
    '{\n'
  + ' - follow: false\n'
  + '   host: hexlet.io\n'
  + ' - proxy: 123.234.53.22\n'
  + ' - timeout: 50\n'
  + ' + timeout: 20\n'
  + ' + verbose: true\n'
  + '}',
  );
});
