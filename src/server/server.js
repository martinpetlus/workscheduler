import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));

app.use('/', express.static(path.resolve(`${__dirname}/../../dist`)));

const server = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
