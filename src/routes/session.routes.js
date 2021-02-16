import { Router } from 'express';

const routes = new Router();

import SessionController from '../app/controllers/SessionController';
const session = new SessionController();

import SessionValidator from '../app/validators/session';
const validator = new SessionValidator();

routes.post('/sessions', validator.create, session.create);

export default routes;
