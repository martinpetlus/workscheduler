import { Router } from 'express';

const router = new Router();

router.post('/signin', (req, res) => {
  res.status(200).json({
    id: 0,
    name: 'Martin Petluš',
    email: 'martinpetlus@gmail.com',
  });
});

router.get('/signout', (req, res) => {
  res.status(200).end();
});

export default router;
