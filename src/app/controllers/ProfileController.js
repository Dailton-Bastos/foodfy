import ModelUser from '../models/User';
import ModelFile from '../models/File';

class ProfileController {
  async index(req, res) {
    const user = await ModelUser.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'createdAt'],
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
