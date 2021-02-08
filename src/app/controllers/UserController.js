import ModelUser from '../models/User';

class UserController {
  async create(req, res) {
    const { email } = req.body;

    const userExists = await ModelUser.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists.',
      });
    }

    const { id, name, avatar, admin } = await ModelUser.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar,
      admin,
    });
  }
}

export default UserController;
