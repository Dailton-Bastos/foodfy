import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.DataTypes.STRING,
        email: Sequelize.DataTypes.STRING,
        password: Sequelize.DataTypes.VIRTUAL,
        password_hash: Sequelize.DataTypes.STRING,
        admin: Sequelize.DataTypes.BOOLEAN,
        active: Sequelize.DataTypes.BOOLEAN,
        reset_token: Sequelize.DataTypes.STRING,
        reset_token_expires: Sequelize.DataTypes.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, {
      targetKey: 'id',
      foreignKey: 'avatar',
      as: 'user_avatar',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
