import { Router } from 'express';
import multer from 'multer';
import multerConfig from '../config/multer';
const upload = multer(multerConfig);

const routes = new Router();

import UserController from '../app/controllers/UserController';
import UserValidator from '../app/validators/user';

routes
  .post('/', new UserValidator().create, new UserController().create)
  .post('/avatar', upload.single('avatar'), (req, res) =>
    res.json({ ok: true })
  );

export default routes;
