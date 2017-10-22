import express from 'express';
/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
/* eslint-enable import/no-extraneous-dependencies */

import webpackConfig from '../../webpack.config';
import setup from './setup';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

setup(app);

const server = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
