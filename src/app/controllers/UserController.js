import { randomBytes } from 'crypto';

import ModelUser from '../models/User';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await ModelUser.findAll({
      attributes: ['id', 'name', 'email', 'avatar', 'admin', 'active'],
      order: [['created_at', 'DESC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(users);
  }

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

  async delete(req, res) {
    const { id } = req.params;

    await ModelUser.destroy({ where: { id } });

    return res.status(200).json({ status: 'success' });
  }
}

export default UserController;
