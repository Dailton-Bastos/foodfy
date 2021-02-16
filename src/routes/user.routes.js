import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const routes = new Router();

import UserController from '../app/controllers/UserController';
import UserValidator from '../app/validators/user';

import authMiddlewares from '../app/middlewares/auth';
import isAdmin from '../app/middlewares/isAdmin';

routes.use(authMiddlewares);

routes.post(
  '/',
  isAdmin,
  new UserValidator().create,
  new UserController().create
);

routes
  .put('/', new UserController().update)
  .post('/avatar', upload.single('avatar'), (req, res) =>
    res.json({ ok: true })
  );

export default routes;
