import { Router } from 'express';

const routes = new Router();

import usersRoutes from './user.routes';

routes.use('/admin/users', usersRoutes);

export default routes;
