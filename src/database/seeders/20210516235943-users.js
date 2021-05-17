const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface) => {
    const users = [];

    for (let i = 0; i < 20; i++) {
      const user = {
        name: faker.name.firstName(),
        email: faker.internet.email(),
        password_hash: bcrypt.hashSync('12345678', 8),
        created_at: new Date(),
        updated_at: new Date(),
      };

      users.push(user);
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
