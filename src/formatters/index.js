import stylish from './stylish.js';

const formatters = (formatName, diff) => {
  let format;

  if (formatName === 'stylish') {
    format = stylish(diff);
  }

  return format;
};

export default formatters;
