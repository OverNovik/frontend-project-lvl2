import yaml from 'js-yaml';

const parser = (data, file) => {
  const formatYaml = '.yaml';
  const formatYml = '.yml';

  if (file === formatYaml || file === formatYml) {
    return yaml.load(data);
  }

  return JSON.parse(data);
};

export default parser;
