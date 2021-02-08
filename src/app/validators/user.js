import * as Yup from 'yup';

import ModelUser from '../models/User';

class UserValidate {
  async create(req, res, next) {
    const { email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
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
}

export default UserValidate;
