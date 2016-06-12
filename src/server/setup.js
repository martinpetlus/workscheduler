import path from 'path';
import bodyParser from 'body-parser';
import express from 'express';

import router from './controllers';

export default (app) => {
  app.use(bodyParser.json());

  app.use('/', express.static(path.join(__dirname, '../../dist')));

  app.use(router);
};
