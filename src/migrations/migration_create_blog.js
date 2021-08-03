'use strict';
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable('blogs', {
         blogID: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER,
         },
         playerID: { allowNull: false, type: Sequelize.INTEGER },
         content: { type: Sequelize.TEXT, allowNull: false },
         image: { type: Sequelize.BLOB('long'), allowNull: true },
         createdAt: { allowNull: false, type: Sequelize.DATE },
         updatedAt: { allowNull: false, type: Sequelize.DATE },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('blogs');
   },
};
