import ModelUser from '../models/User';

export default async (req, res, next) => {
  const { admin } = await ModelUser.findByPk(req.userId);

  if (!admin) {
    return res.status(403).json({ error: 'Does not have permission!' });
  }

  return next();
};
