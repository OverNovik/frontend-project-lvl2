import json from './json.js';
import plain from './plain.js';
import stylish from './stylish.js';

const format = (formatName, diff) => {
  if (formatName === 'stylish') {
    return stylish(diff);
  }

  if (formatName === 'plain') {
    return plain(diff);
  }

  if (formatName === 'json') {
    return json(diff);
  }

  return stylish(diff);
};

export default format;
