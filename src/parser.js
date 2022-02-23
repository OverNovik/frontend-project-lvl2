import yaml from 'js-yaml';

const parser = (data, file) => {
  const formatYaml = '.yaml';
  const formatYml = '.yml';
  const formatJson = '.json';
  let result;

  if (file === formatYaml || file === formatYml) {
    result = yaml.load(data);
  }

  if (file === formatJson) {
    result = JSON.parse(data);
  }

  return result;
};

export default parser;
