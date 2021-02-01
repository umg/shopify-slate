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
        '@babel/preset-env',
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
        '@babel/preset-react',
        {
          useBuiltIns: true,
          pragma: 'React.createElement',
          pragmaFrag: 'React.Fragment',
          development: false,
        },
      ],
    ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-transform-react-constant-elements',
      '@babel/plugin-proposal-class-properties',
      [
        'babel-plugin-module-resolver',
        {
          root: ['./'],
          alias: {
            regeneratorRuntime: './node_modules/regenerator-runtime',
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
