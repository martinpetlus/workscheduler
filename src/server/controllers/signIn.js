import { Router } from 'express';

const router = new Router();

router.post('/', (req, res) => {
  res.status(200).json({
    id: 0,
    name: 'Martin Petluš',
    email: 'martinpetlus@gmail.com',
  });
});

export default router;
