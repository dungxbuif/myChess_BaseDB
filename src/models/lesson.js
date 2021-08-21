'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
   class Lessons extends Model {
      static associate(models) {}
   }
   Lessons.init(
      {
         lessonID: { type: DataTypes.INTEGER, primaryKey: true },
         title: DataTypes.STRING,
         content: DataTypes.TEXT,
         thumbnail: DataTypes.STRING,
      },
      {
         sequelize,
         modelName: 'Lessons',
      },
   );
   return Lessons;
};
