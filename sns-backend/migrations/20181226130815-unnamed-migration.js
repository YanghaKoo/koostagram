'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    // users 테이블에 프로필 사진 컬럼 추가
    return queryInterface.addColumn('users', 'pic', {
      type : Sequelize.STRING,
      allowNull : true
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'pic')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
