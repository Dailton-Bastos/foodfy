import Sequelize, { Model } from 'sequelize';

class File extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.DataTypes.STRING,
        path: Sequelize.DataTypes.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
