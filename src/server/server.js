import path from 'path';
import express from 'express';

const app = express();

app.use('/', express.static(path.resolve(`${__dirname}/../../dist`)));

const server = app.listen(process.env.PORT || 8080, () => {
  // eslint-disable-next-line no-console
  console.log('App listening at http://%s:%s', server.address().address, server.address().port);
});
