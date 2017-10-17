import { Router } from 'express';

import signIn from './signIn';
import workSchedule from './workSchedule';

const router = new Router();

router.use('/signin', signIn);
router.use('/workschedule', workSchedule);

export default router;
