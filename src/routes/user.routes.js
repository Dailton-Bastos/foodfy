import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const routes = new Router();

import UserController from '../app/controllers/UserController';
const user = new UserController();

import UserValidator from '../app/validators/user';
const validator = new UserValidator();

import FileController from '../app/controllers/FileController';
const file = new FileController();

import authMiddlewares from '../app/middlewares/auth';
import isAdmin from '../app/middlewares/isAdmin';

routes.use(authMiddlewares, isAdmin);

routes
  .get('/', user.index)
  .post('/', validator.create, user.create)
  .put('/:id', validator.update, user.update)
  .get('/:id', validator.show, user.show)
  .delete('/:id', validator.delete, user.delete)
  .post('/avatar', upload.single('avatar'), file.create);

export default routes;
