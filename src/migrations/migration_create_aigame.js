'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('aigames', {
         gameID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         playerID: { type: Sequelize.INTEGER, allowNull: false },
         time: { type: Sequelize.INTEGER, allowNull: true },
         result: { type: Sequelize.BOOLEAN, allowNull: true },
         moves: { type: Sequelize.INTEGER, allowNull: true },
         level: { type: Sequelize.STRING, allowNull: true },
         date: { type: Sequelize.DATE, allowNull: true },
         createdAt: { allowNull: false, type: Sequelize.DATE },
         updatedAt: { allowNull: false, type: Sequelize.DATE },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('aigames');
   },
};
