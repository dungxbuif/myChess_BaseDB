"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("lessons", {
            lessonID: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            title: { type: Sequelize.STRING, allowNull: true },
            content: { type: Sequelize.TEXT, allowNull: true },
            thumbnail: { type: Sequelize.STRING, allowNull: true },
            createdAt: { allowNull: false, type: Sequelize.DATE },
            updatedAt: { allowNull: false, type: Sequelize.DATE },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("lessons");
    },
};
