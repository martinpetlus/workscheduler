import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.status(200).json({});
});

export default router;