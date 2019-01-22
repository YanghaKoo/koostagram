"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "notify",
      {
        category: {
          // like, comment, mention
          type: Sequelize.STRING(30),
          allowNull: false
        },

        // 언급하는 사람 id
        notifying: {
          type: Sequelize.INTEGER,
          allowNull: false
        },

        // 언급 당한 사람 id
        notified: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        // 언급한 게시물 id
        post: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        // 게시물 확인 여부
        isChecked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
      },
      {
        timestamps: true,
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci"
      }
    );

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("notify");
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
