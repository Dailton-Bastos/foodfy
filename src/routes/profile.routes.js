import { Router } from 'express';

const routes = new Router();

import ProfileController from '../app/controllers/ProfileController';
const profile = new ProfileController();

import authMiddlewares from '../app/middlewares/auth';

routes.use(authMiddlewares);

routes.get('/', profile.index);

export default routes;
