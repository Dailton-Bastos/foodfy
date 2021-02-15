import ModelUser from '../models/User';

class UserController {
  async create(req, res) {
    const { id, name, email, avatar, admin } = await ModelUser.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar,
      admin,
    });
  }

  async update(req, res) {
    console.log(req.userId);
    return res.json({ ok: true });
  }
}

export default UserController;
