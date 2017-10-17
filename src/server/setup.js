import path from 'path';
import bodyParser from 'body-parser';

import router from './controllers';

export default (app) => {
  app.use(bodyParser.json());

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
  });

  app.use(router);
};
