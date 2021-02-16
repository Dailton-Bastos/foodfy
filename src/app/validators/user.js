import * as Yup from 'yup';

import ModelUser from '../models/User';

class UserValidate {
  async create(req, res, next) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({
        error: 'Validation fails',
      });
    }

    const userExists = await ModelUser.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({
        error: 'User already exists.',
      });
    }

    return next();
  }

  async update(req, res, next) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar: Yup.boolean(),
      admin: Yup.boolean(),
      active: Yup.boolean(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails.' });
    }

    const { id } = req.params;

    const { email } = req.body;

    const user = await ModelUser.findByPk(id);

    if (email && email !== user.email) {
      const userExists = await ModelUser.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists.' });
      }
    }

    return next();
  }
}

export default UserValidate;
