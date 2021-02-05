const fs = require('fs');

const SlateConfig = require('@shopify/slate-config');

const config = new SlateConfig(require('../../../../slate-tools.schema'));

const part = {module: {rules: []}};

const babelLoader = {
  test: /\.js$/,
  exclude: config.get('webpack.babel.exclude'),
  loader: 'babel-loader',
  options: {
    babelrc: false,
    presets: [
      [
        require('@babel/preset-env'),
        {
          useBuiltIns: 'entry',
          corejs: 2,
          targets: {
            chrome: '58',
            ie: '11',
          },
          debug: false,
          bugfixes: true,
        },
      ],
      [
        require('@babel/preset-react'),
        {
          useBuiltIns: true,
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          development: false,
        },
      ],
    ],
    plugins: [
      require('@babel/plugin-syntax-dynamic-import'),
      require('@babel/plugin-transform-react-constant-elements'),
      require('@babel/plugin-proposal-class-properties'),
      [
        require('babel-plugin-module-resolver'),
        {
          root: ['./'],
          alias: {
            regeneratorRuntime: require('regenerator-runtime'),
          },
        },
      ],
    ],
    extends: config.get('webpack.babel.configPath'),
  },
};

if (
  fs.existsSync(config.get('webpack.babel.configPath')) &&
  config.get('webpack.babel.enable')
) {
  part.module.rules.push(babelLoader);
}

module.exports = part;
