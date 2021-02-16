module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'active', {
      type: Sequelize.DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    });
  },

  down: async (queryInterface) =>
    await queryInterface.removeColumn('users', 'active'),
};
