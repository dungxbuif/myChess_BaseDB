'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class FriendRequests extends Model {
      static associate(models) {}
   }
   FriendRequests.init(
      {
         requesterID: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
               model: 'Players',
               key: 'playerID',
            },
         },
         receiverID: {
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
         modelName: 'FriendRequests',
      },
   );
   return FriendRequests;
};
