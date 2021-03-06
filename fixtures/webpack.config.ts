import * as path from 'path';
import webpack, { Configuration } from 'webpack';
import { Configuration as DevServer } from 'webpack-dev-server';
import { TEST_PORT } from './utils';

const env: webpack.Configuration['mode'] = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const config: Configuration & { devServer: DevServer } = {
  context: __dirname,
  entry: { shared: './shared.tsx', core: '../src/internals/core.ts', sorge: './externals/sorge.ts' },
  output: {
    filename: '[name].js',
  },
  devServer: {
    contentBase: path.join(__dirname, '../fixtures/regression'),
    hot: true,
    port: TEST_PORT,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          configFile: path.resolve(__dirname, './tsconfig.json'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
  },
  mode: env,
  target: 'web',
  externals: [
    function ({ context, request }, callback) {
      if (!/externals$/.test(context) && /Sorge$/.test(request)) {
        return callback(null, 'window Sorge');
      }
      callback();
    },
    {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  ],
};

export default config;
