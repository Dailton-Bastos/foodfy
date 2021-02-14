import { Router } from 'express';

const routes = new Router();

import SessionController from '../app/controllers/SessionController';
import SessionValidator from '../app/validators/session';

routes.post(
  '/sessions',
  new SessionValidator().create,
  new SessionController().create
);

export default routes;
