import { randomBytes } from 'crypto';

import ModelUser from '../models/User';
import ModelFile from '../models/File';

import Mail from '../../libs/Mail';

class UserController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const users = await ModelUser.findAll({
      attributes: ['id', 'name', 'email', 'admin', 'active'],
      include: [
        {
          model: ModelFile,
          as: 'user_avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
      order: [['created_at', 'DESC']],
      limit: 6,
      offset: (page - 1) * 6,
    });

    return res.json(users);
  }

  async create(req, res) {
    const password = randomBytes(5).toString('hex');

    const { id, name, email, active } = await ModelUser.create({
      ...req.body,
      password,
    });

    await Mail.sendMail({
      to: `${name} < ${email} >`,
      subject: 'Senha de acesso.',
      template: 'send_password',
      context: {
        user: name,
        password,
      },
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

  async show(req, res) {
    const { id } = req.params;
    const user = await ModelUser.findByPk(id, {
      attributes: ['id', 'name', 'email', 'admin', 'active', 'createdAt'],
      include: [
        {
          model: ModelFile,
          as: 'user_avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    await ModelUser.destroy({ where: { id } });

    return res.status(200).json({ status: 'success' });
  }
}

export default UserController;
