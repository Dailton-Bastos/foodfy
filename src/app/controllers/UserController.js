import { randomBytes } from 'crypto';

import ModelUser from '../models/User';
import ModelFile from '../models/File';
import Notification from '../schemas/Notification';

import SendPasswordMail from '../jobs/SendPasswordMail';

import Queue from '../../libs/Queue';

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

    const data = { name, email, password };
    await Queue.add(SendPasswordMail.key, data);

    await Notification.create({
      content: `Boas-vindas ${name}, seu cadastrado foi realizado com sucesso, por favor altere sua senha.`,
      user: id,
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
