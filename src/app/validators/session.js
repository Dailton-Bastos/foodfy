import * as Yup from 'yup';

import ModelUser from '../models/User';
import ModelFile from '../models/File';

class SessionValidate {
  async create(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = req.body;

    const user = await ModelUser.findOne({
      where: { email },
      include: [
        {
          model: ModelFile,
          as: 'user_avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match.' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'Account inactive.' });
    }

    req.user = user;

    return next();
  }

  async forgotPassword(req, res, next) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'E-mail required or invalid.' });
    }

    const { email } = req.body;

    const user = await ModelUser.findOne({
      where: { email },
      attributes: ['id', 'name', 'email', 'active'],
    });

    if (!user) {
      return res.status(401).json({ error: 'User or e-mail not found.' });
    }

    if (!user.active) {
      return res.status(401).json({ error: 'Erro user account inactive.' });
    }

    req.user = user;

    return next();
  }
}

export default SessionValidate;
