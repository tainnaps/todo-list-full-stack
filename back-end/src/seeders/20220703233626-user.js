module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        name: 'First User',
        email: 'first@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e', // 123456
      },
      {
        id: 2,
        name: 'Second User',
        email: 'second@email.com',
        password: 'c33367701511b4f6020ec61ded352059', // 654321
      },
    ], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
