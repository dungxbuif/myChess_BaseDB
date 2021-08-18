'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Reacts extends Model {
      static associate(models) {}
   }

   Reacts.init(
      {
         playerID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         blogID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         like: DataTypes.BOOLEAN,
      },
      {
         sequelize,
         modelName: 'Reacts',
      },
   );
   return Reacts;
};
