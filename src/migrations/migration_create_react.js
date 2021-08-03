'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('reacts', {
         blogID: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         playerID: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         like: { type: Sequelize.BOOLEAN, allowNull: false },
         createdAt: { allowNull: false, type: Sequelize.DATE },
         updatedAt: { allowNull: false, type: Sequelize.DATE },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('reacts');
   },
};
