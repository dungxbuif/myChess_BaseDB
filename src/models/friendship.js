'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class FriendShips extends Model {
      static associate(models) {}
   }
   FriendShips.init(
      {
         playerID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
               model: 'Players',
               key: 'playerID',
            },
         },
         friendID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
               model: 'Players',
               key: 'playerID',
            },
         },
      },
      {
         sequelize,
         modelName: 'FriendShips',
      },
   );
   return FriendShips;
};
