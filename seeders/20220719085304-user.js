'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return await queryInterface.bulkInsert('users', [
      {
      fullname: 'Yadi Apriyadi',
      email: 'yadi@gmail.com',
      password: '123456',
      status: 'seller'
      },
      {
      fullname: 'Andri Sukma',
      email: 'andri@gmail.com',
      password: '123456',
      status: 'buyer'
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('users', null, {});
  }
};
