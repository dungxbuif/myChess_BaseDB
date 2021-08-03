'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Articles extends Model {
      static associate(models) {
         Articles.belongsToMany(models.Players, {
            foreignKey: 'newsID',
            as: 'articleData',
            through: 'ArticleSaved',
         });
      }
   }
   Articles.init(
      {
         newsID: DataTypes.INTEGER,
         title: DataTypes.STRING,
         content: DataTypes.TEXT,
      },
      {
         sequelize,
         modelName: 'Articles',
      },
   );
   return Articles;
};
