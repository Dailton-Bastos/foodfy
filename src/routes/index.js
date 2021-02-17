import { Router } from 'express';

const routes = new Router();

import sessionsRoutes from './session.routes';
import usersRoutes from './user.routes';
import profileRoutes from './profile.routes';

routes.use(sessionsRoutes);

routes.use('/admin/users', usersRoutes);
routes.use('/admin/profile', profileRoutes);

export default routes;
