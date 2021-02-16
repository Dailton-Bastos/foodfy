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
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default UserController;
