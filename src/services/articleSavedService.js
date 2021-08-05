const db = require('../models');

const saveArticle = async (dataRequest) => {
   const { playerID, newsID } = dataRequest;
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.ArticleSaved.create({
            playerID,
            newsID,
         });

         resolve({
            code: 1,
            data,
            message: 'Saved article succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const deleteArticle = async (dataRequest) => {
   const { playerID, newsID } = dataRequest;
   return new Promise(async (resolve, reject) => {
      try {
         await db.ArticleSaved.destroy({
            where: {
               playerID,
               newsID,
            },
         });

         resolve({
            code: 1,
            data,
            message: 'Deleted article succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getAllArticleSaved = async (playerID) => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.Players.findAll({
            where: {
               userId: userId,
            },

            include: [
               {
                  model: db.Articles,
                  as: 'articleData',
               },
            ],
         });

         resolve({
            code: 1,
            data,
            message: 'Get list friend succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   saveArticle,
   deleteArticle,
   getAllArticleSaved,
};
