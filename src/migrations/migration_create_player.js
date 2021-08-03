'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('players', {
         playerID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         name: { type: Sequelize.STRING, allowNull: false },
         point: { type: Sequelize.INTEGER, allowNull: true },
         createdAt: { allowNull: false, type: Sequelize.DATE },
         updatedAt: { allowNull: false, type: Sequelize.DATE },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('players');
   },
};
