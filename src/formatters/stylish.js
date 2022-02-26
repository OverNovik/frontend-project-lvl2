const stylish = (diff) => {
  const visual = diff.map((item) => ` ${item.key}: ${item.value}`);
  const result = `{\n${visual.join('\n')}\n}`;

  return result;
};

export default stylish;
