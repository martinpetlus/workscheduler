import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath,
}));

app.use('/', express.static(path.resolve(`${__dirname}/../../dist`)));

const server = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
