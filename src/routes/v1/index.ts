import { Router } from 'express';

const v1Router = Router();

v1Router.get('/', (_req, res) => {
  res.send('API v1 is working!');
});

export default v1Router;
