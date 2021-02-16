import { randomBytes } from 'crypto';

import ModelUser from '../models/User';

class UserController {
  async create(req, res) {
    const { id, name, email, admin } = req.body;
    const password = randomBytes(5).toString('hex');

    console.log('User password', password);

    await ModelUser.create({
      id,
      name,
      email,
      admin,
      password,
    });

    return res.json({
      id,
      name,
      email,
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
