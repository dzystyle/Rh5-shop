const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');

const components = keys.reduce((memo, key) => {
  memo[key.match(/([^\/]+)\.js$/)[1]] = context(key); // eslint-disable-line no-param-reassign
  return memo;
}, {});
export default components;
