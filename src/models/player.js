'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Players extends Model {
      static associate(models) {
         Players.hasMany(models.AIGames, {
            foreignKey: 'playerID',
            as: 'gameData',
            onDelete: 'CASCADE',
         });
         Players.belongsToMany(models.Articles, {
            foreignKey: 'playerID',
            as: 'articleData',
            through: 'ArticleSaved',
            onDelete: 'CASCADE',
         });
         Players.belongsToMany(models.Blogs, {
            foreignKey: 'playerID',
            as: 'reactData',
            through: 'Reacts',
            onDelete: 'CASCADE',
         });

         Players.hasMany(models.Blogs, {
            foreignKey: 'playerID',
            as: 'blogData',
            onDelete: 'CASCADE',
         });

         Players.belongsToMany(Players, {
            as: 'userFriend',
            through: 'friendShips',
            foreignKey: 'friendID',
            onDelete: 'CASCADE',
         });

         Players.belongsToMany(Players, {
            as: 'Friend',
            through: 'friendShips',
            foreignKey: 'playerID',
            onDelete: 'CASCADE',
         });

         Players.belongsToMany(Players, {
            as: 'Receive',
            through: 'friendRequests',
            foreignKey: 'receiverID',
            onDelete: 'CASCADE',
         });
         Players.belongsToMany(Players, {
            as: 'Request',
            through: 'friendRequests',
            foreignKey: 'requesterID',
            onDelete: 'CASCADE',
         });
      }
   }

   Players.init(
      {
         playerID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         email: DataTypes.STRING,
         password: DataTypes.STRING,
         name: DataTypes.STRING,
         point: DataTypes.INTEGER,
         img: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Players',
      },
   );
   return Players;
};
