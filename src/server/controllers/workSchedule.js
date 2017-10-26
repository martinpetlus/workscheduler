import { Router } from 'express';
import { exec } from 'child_process';

const router = new Router();

router.post('/', (req, res) => {
  res.status(200).end();

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
