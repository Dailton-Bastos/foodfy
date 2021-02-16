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
        avatar: Sequelize.DataTypes.INTEGER,
        admin: Sequelize.DataTypes.BOOLEAN,
        active: Sequelize.DataTypes.BOOLEAN,
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
      as: 'avatar',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
