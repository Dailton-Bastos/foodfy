import ModelUser from '../models/User';

class ProfileController {
  async index(req, res) {
    const { id, name, email, createdAt } = await ModelUser.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
      createdAt,
    });
  }

  async update(req, res) {
    const { name, email, password, avatar } = req.body;

    const user = await ModelUser.findByPk(req.userId);

    await user.update({
      name,
      email,
      password,
      avatar,
    });

    return res.json({
      name,
      email,
      avatar,
    });
  }
}

export default ProfileController;
