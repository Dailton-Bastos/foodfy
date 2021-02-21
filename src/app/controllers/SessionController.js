import jwt from 'jsonwebtoken';
import { suid } from 'rand-token';
import { addMinutes } from 'date-fns';
import authConfig from '../../config/auth';

import ModelUser from '../models/User';
import Notification from '../schemas/Notification';

import SendResetPasswordMail from '../jobs/SendResetPasswordMail';

import Queue from '../../libs/Queue';

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
    const { id, name, email } = req.user;

    const token = suid(20);

    await ModelUser.update(
      {
        reset_token: token,
        reset_token_expires: addMinutes(new Date(), 60),
      },
      {
        where: { id },
      }
    );

    const data = { name, email, token };

    await Queue.add(SendResetPasswordMail.key, data);

    return res.json({ success: 'Check user email.' });
  }

  async resetPassword(req, res) {
    const { email, password } = req.body;

    const user = await ModelUser.findOne({ where: { email } });

    const { id, name, active } = await user.update({
      password,
      reset_token: null,
      reset_token_expires: null,
    });

    await Notification.create({
      content: `Olá ${name}, sua nova senha foi criada com sucesso.`,
      user: id,
    });

    return res.json({
      id,
      name,
      email,
      active,
    });
  }
}

export default SessionController;
