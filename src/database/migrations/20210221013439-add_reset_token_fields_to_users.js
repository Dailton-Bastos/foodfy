module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn(
        'users',
        'reset_token',
        {
          type: Sequelize.DataTypes.STRING,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await queryInterface.addColumn(
        'users',
        'reset_token_expires',
        {
          type: Sequelize.DataTypes.DATE,
          allowNull: true,
        },
        {
          transaction,
        }
      );

      await transaction.commit();
      return Promise.resolve();
    } catch (error) {
      if (transaction) await transaction.rollback();

      return Promise.reject(error);
    }
  },

  down: async (queryInterface) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.removeColumn('users', 'reset_token', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'reset_token_expires', {
        transaction,
      });

      await transaction.commit();
      return Promise.resolve();
    } catch (error) {
      if (transaction) await transaction.rollback();

      return Promise.reject(error);
    }
  },
};
