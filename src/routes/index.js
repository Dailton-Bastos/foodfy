import { Router } from 'express';

const routes = new Router();

import sessionsRoutes from './session.routes';
import usersRoutes from './user.routes';

routes.use(sessionsRoutes);

routes.use('/admin/users', usersRoutes);

export default routes;
