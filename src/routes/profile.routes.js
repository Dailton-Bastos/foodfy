import { Router } from 'express';

const routes = new Router();

import ProfileController from '../app/controllers/ProfileController';
const profile = new ProfileController();

import NotificationController from '../app/controllers/NotificationController';
const notification = new NotificationController();

import ProfileValidator from '../app/validators/profile';
const validator = new ProfileValidator();

import authMiddlewares from '../app/middlewares/auth';

routes.use(authMiddlewares);

routes
  .get('/', profile.index)
  .put('/', validator.update, profile.update)
  .get('/notifications', notification.index)
  .put('/notifications/:id', notification.update);

export default routes;
