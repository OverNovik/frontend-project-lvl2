import plain from './plain.js';
import stylish from './stylish.js';

const formatters = (formatName, diff) => {
  let format;

  if (formatName === 'stylish') {
    format = stylish(diff);
  }

  if (formatName === 'plain') {
    format = plain(diff);
  }

  return format;
};

export default formatters;
