import { Router } from 'express';

import auth from './auth';
import workSchedule from './workSchedule';

const router = new Router();

router.use('/', auth);
router.use('/workschedule', workSchedule);

export default router;
