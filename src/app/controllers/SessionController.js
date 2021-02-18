import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
  async create(req, res) {
    const { id, name, email, user_avatar } = req.user;

    return res.json({
      user: {
        id,
        name,
        email,
        user_avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default SessionController;
