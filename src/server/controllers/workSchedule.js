import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({ weeks: ['week 1', 'week 2'] });
});

export default router;
