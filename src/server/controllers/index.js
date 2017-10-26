import { Router } from 'express';

import auth from './auth';
import workSchedules from './workSchedules';

const router = new Router();

router.use('/', auth);
router.use('/workschedules', workSchedules);

export default router;
