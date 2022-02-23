import yaml from 'js-yaml';
// import path from 'path';

const parser = (data, file) => {
  const formatYaml = '.yaml';
  const formatYml = '.yml';
  // const formatJson = '.json';

  if (file === formatYaml || file === formatYml) {
    return yaml.load(data);
  }

  return JSON.parse(data);
};

export default parser;
