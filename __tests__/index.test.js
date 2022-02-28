import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { beforeEach, expect, test } from '@jest/globals';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let filepath1;
let filepath2;
let filepath1Yaml;
let filepath2Yaml;

const correctOutputStylishFormat = '{\n'
+ '    common: {\n'
+ '      + follow: false\n'
+ '        setting1: Value 1\n'
+ '      - setting2: 200\n'
+ '      - setting3: true\n'
+ '      + setting3: null\n'
+ '      + setting4: blah blah\n'
+ '      + setting5: {\n'
+ '            key5: value5\n'
+ '        }\n'
+ '        setting6: {\n'
+ '            doge: {\n'
+ '              - wow: \n'
+ '              + wow: so much\n'
+ '            }\n'
+ '            key: value\n'
+ '          + ops: vops\n'
+ '        }\n'
+ '    }\n'
+ '    group1: {\n'
+ '      - baz: bas\n'
+ '      + baz: bars\n'
+ '        foo: bar\n'
+ '      - nest: {\n'
+ '            key: value\n'
+ '        }\n'
+ '      + nest: str\n'
+ '    }\n'
+ '  - group2: {\n'
+ '        abc: 12345\n'
+ '        deep: {\n'
+ '            id: 45\n'
+ '        }\n'
+ '    }\n'
+ '  + group3: {\n'
+ '        deep: {\n'
+ '            id: {\n'
+ '                number: 45\n'
+ '            }\n'
+ '        }\n'
+ '        fee: 100500\n'
+ '    }\n'
+ '}';

const correctOutputPlainFormat = "Property 'common.follow' was added with value: false\n"
+ "Property 'common.setting2' was removed\n"
+ "Property 'common.setting3' was updated. From true to null\n"
+ "Property 'common.setting4' was added with value: 'blah blah'\n"
+ "Property 'common.setting5' was added with value: [complex value]\n"
+ "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n"
+ "Property 'common.setting6.ops' was added with value: 'vops'\n"
+ "Property 'group1.baz' was updated. From 'bas' to 'bars'\n"
+ "Property 'group1.nest' was updated. From [complex value] to 'str'\n"
+ "Property 'group2' was removed\n"
+ "Property 'group3' was added with value: [complex value]";

beforeEach(() => {
  filepath1 = path.join(__dirname, '../', '__fixtures__/file1.json');
  filepath2 = path.join(__dirname, '../', '__fixtures__/file2.json');
  filepath1Yaml = path.join(__dirname, '../', '__fixtures__/file1.yaml');
  filepath2Yaml = path.join(__dirname, '../', '__fixtures__/file2.yaml');
});

test('test genDiff function with stylish format (JSON)', () => {
  expect(genDiff(filepath1, filepath2)).toBe(correctOutputStylishFormat);
});

test('test genDiff function with stylish format (YAML)', () => {
  expect(genDiff(filepath1Yaml, filepath2Yaml)).toBe(correctOutputStylishFormat);
});

test('test genDiff function with plain format (JSON)', () => {
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(correctOutputPlainFormat);
});

test('test genDiff function with plain format (YAML)', () => {
  expect(genDiff(filepath1Yaml, filepath2Yaml, 'plain')).toBe(correctOutputPlainFormat);
});
