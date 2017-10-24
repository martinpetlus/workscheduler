import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

import router from './controllers';

const distDir = path.join(__dirname, '..', '..', 'dist');

export default (app) => {
  app.use(bodyParser.json());

  app.use(express.static(distDir));

  app.use('/api', router);

  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
};
