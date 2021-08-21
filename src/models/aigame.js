'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class AIGames extends Model {
      static associate(models) {
         AIGames.belongsTo(models.Players, {
            foreignKey: 'playerID',
            as: 'gameData',
         });
      }
   }
   AIGames.init(
      {
         gameID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         playerID: DataTypes.INTEGER,
         time: DataTypes.INTEGER,
         result: DataTypes.BOOLEAN,
         moves: DataTypes.INTEGER,
         level: DataTypes.STRING,
         date: DataTypes.DATE,
      },
      {
         sequelize,
         modelName: 'AIGames',
      },
   );
   return AIGames;
};
