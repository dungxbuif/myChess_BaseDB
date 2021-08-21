'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('articlesaved', {
         playerID: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         newsID: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         createdAt: { allowNull: false, type: Sequelize.DATE },
         updatedAt: { allowNull: false, type: Sequelize.DATE },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('reacts');
   },
};
