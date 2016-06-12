import { Router } from 'express';

import signIn from './signIn';

const router = Router();

router.use('/signin', signIn);

export default router;
