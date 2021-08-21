'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Blogs extends Model {
      static associate(models) {
         Blogs.belongsToMany(models.Players, {
            foreignKey: 'blogID',
            as: 'reactData',
            through: 'Reacts',
         });

         Blogs.belongsTo(models.Players, {
            foreignKey: 'playerID',
            as: 'blogData',
         });
      }
   }
   Blogs.init(
      {
         blogID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
         },
         playerID: DataTypes.INTEGER,
         content: DataTypes.TEXT,
         image: DataTypes.BLOB('long'),
      },
      {
         sequelize,
         modelName: 'Blogs',
      },
   );
   return Blogs;
};
