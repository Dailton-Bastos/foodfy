import { Router } from 'express';

const routes = new Router();

import UserController from '../app/controllers/UserController';
import UserValidator from '../app/validators/user';

routes.post('/', new UserValidator().create, new UserController().create);

export default routes;
