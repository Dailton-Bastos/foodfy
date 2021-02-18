import { Router } from 'express';

const routes = new Router();

import ProfileController from '../app/controllers/ProfileController';
const profile = new ProfileController();

import ProfileValidator from '../app/validators/profile';
const validator = new ProfileValidator();

import authMiddlewares from '../app/middlewares/auth';

routes.use(authMiddlewares);

routes.get('/', profile.index);
routes.put('/', validator.update, profile.update);

export default routes;
