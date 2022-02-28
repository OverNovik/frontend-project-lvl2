import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (formatName, diff) => {
  let formatter;

  if (formatName === 'stylish') {
    formatter = stylish(diff);
  }

  if (formatName === 'plain') {
    formatter = plain(diff);
  }

  if (formatName === 'json') {
    formatter = json(diff);
  }

  return formatter;
};

export default format;
