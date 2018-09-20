const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

const {
  injectBabelPlugin
} = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');
const rewireDecorators = require('react-app-rewire-decorators-legacy');
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = function override(config, env) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src')
  };

  config = rewireReactHotLoader(config, env)
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#1DA57A"
    },
  })(config, env);
  config = rewireDecorators(config, env);
  config = injectBabelPlugin(['import', {
    libraryName: 'antd-mobile',
    style: "css"
  }], config);
  //  console.log(config);  
  return config;
};