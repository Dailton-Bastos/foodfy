import { randomBytes } from 'crypto';

import ModelUser from '../models/User';

class UserController {
  async create(req, res) {
    const password = randomBytes(5).toString('hex');

    console.log('User password', password);

    const { id, name, email, active } = await ModelUser.create({
      ...req.body,
      password,
    });

    return res.json({
      id,
      name,
      email,
      active,
    });
  }

  async update(req, res) {
    const { id } = req.params;

    const user = await ModelUser.findByPk(id);

    await user.update(req.body);

    const { name, email, avatar, admin, active } = await ModelUser.findByPk(id);

    return res.json({
      id,
      name,
      email,
      avatar,
      admin,
      active,
    });
  }
}

export default UserController;
