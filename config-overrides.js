// const path = require('path');

// function resolve(dir) {
//   return path.join(__dirname, '.', dir)
// }

// const {
//   injectBabelPlugin
// } = require('react-app-rewired');
// const rewireLess = require('react-app-rewire-less');
// const rewireDecorators = require('react-app-rewire-decorators-legacy');
// const rewireMobX = require('react-app-rewire-mobx');

// module.exports = function override(config, env) {
//   config.resolve.alias = {
//     ...config.resolve.alias,
//     '@': resolve('src')
//   };
//   config = rewireMobX(config, env);
//   config = rewireLess.withLoaderOptions({
//     modifyVars: {
//       "@primary-color": "#1DA57A"
//     },
//   })(config, env);
//   config = rewireDecorators(config, env);
//   config = injectBabelPlugin(['import', {
//     libraryName: 'antd-mobile',
//     style: "css"
//   }], config);
//   //  console.log(config);  
//   return config;
// };

/* config-overrides.js */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}
const tsImportPluginFactory = require('ts-import-plugin');
const rewireDecorators = require('react-app-rewire-decorators-legacy');
const {
  getLoader
} = require("react-app-rewired");
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  
  const tsLoader = getLoader(
    config.module.rules,
    rule =>
    rule.loader &&
    typeof rule.loader === 'string' &&
    rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryName: 'antd-mobile',
        style: 'css',
      })]
    })
  };

  config = rewireLess.withLoaderOptions({
    modifyVars: {
      "@primary-color": "#1DA57A"
    },
  })(config, env);
  config = rewireDecorators(config,env);
  config.resolve.alias = {
    ...config.resolve.alias,
    '@': resolve('src')
  };
  return config;
}