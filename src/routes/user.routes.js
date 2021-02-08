import { Router } from 'express';

const routes = new Router();

import UserController from '../app/controllers/UserController';

routes.post('/', new UserController().create);

export default routes;
