import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';
import mongoConfig from '../config/mongo';

import User from '../app/models/User';
import File from '../app/models/File';

const models = [User, File];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, mongoConfig);
  }
}

export default new Database();
