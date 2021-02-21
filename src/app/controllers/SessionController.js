import jwt from 'jsonwebtoken';
import { suid } from 'rand-token';
import { addMinutes } from 'date-fns';
import authConfig from '../../config/auth';

import ModelUser from '../models/User';

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

  async forgotPassword(req, res) {
    const { id } = req.user;

    await ModelUser.update(
      {
        reset_token: suid(20),
        reset_token_expires: addMinutes(new Date(), 60),
      },
      {
        where: { id },
      }
    );

    return res.json({ success: 'Check user email.' });
  }
}

export default SessionController;
