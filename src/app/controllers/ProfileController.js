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
}

export default ProfileController;
