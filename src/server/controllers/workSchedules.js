import { Router } from 'express';
import { exec } from 'child_process';

import { create, get, getAll } from '../models/WorkSchedule';

const router = new Router();

router.get('/', async (req, res) => {
  res.status(200).json(await getAll());
});

router.get('/:id', async (req, res) => {
  try {
    res.status(200).json(await get(req.params.id));
  } catch (error) {
    res.status(404).json(error);
  }
});

router.post('/new', async (req, res) => {
  res.status(200).json(await create(req.body));

  const opts = JSON.stringify(req.body);

  exec(
    `java -jar workscheduler.jar '${opts}'`,
    { cwd: `${__dirname}/../../../build/libs` },
    (error, stdout) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      console.log(stdout);
    },
  );
});

export default router;
