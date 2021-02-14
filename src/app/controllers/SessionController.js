import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController {
  async create(req, res) {
    const { id, name, email, admin } = req.user;

    return res.json({
      user: {
        id,
        name,
        email,
        admin,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default SessionController;
