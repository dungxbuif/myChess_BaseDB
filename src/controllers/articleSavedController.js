const db = require('../models');

const saveArticle = async (req, res, next) => {
   try {
      const data = await db.Articles.create({
         ...req.body
      });

      return res.status(200).send({
         code: 1,
         data,
         message: 'Create article succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         data,
         message: `Create article failed. ${e}`,
      });
   }
};

const editArticle = async (req, res, next) => {
   let reqObj = {...req.body};
   reqObj.newsID = +reqObj.newsID;
   try {
      let article = await db.Articles.findOne({
         where: {
            newsID: reqObj.newsID,
         }
      });
      if(article) {
         article.link = reqObj.link;
         article.content = reqObj.content;
         article.img = reqObj.img;
         article.title = reqObj.title;
         const data = await article.save();
         return res.status(200).send({
            code: 1,
            data,
            message: 'Create article succeed',
         });
      } else {
         return res.status(404).send({
            code: 0,
            message: 'Articles not found',
         });
      }
     
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         data,
         message: `Create article failed. ${e}`,
      });
   }
};


const deleteArticle = async (req, res, next) => {
   const newsID = +req.body.newsID;
   try {
      await db.Articles.destroy({
         where: {
            newsID,
         },
      });
      return res.status(200).json({
         code: 1,
         message: 'Deleted article succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Delete lesson failed. ${e.message}`,
      });
   }
};

const getAllArticleSaved = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 0,
         message: 'Missing parameters',
      });

   const playerID = +req.query.playerID;
   try {
      const data = await db.Players.findAll({
         where: {
            playerID,
         },

         include: [
            {
               model: db.Articles,
               as: 'articleData',
            },
         ],
      });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get list friend succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Get all lessons failed',
      });
   }
};

const getAllArticle = async (req, res, next) => {
   try {
      const data = await db.Articles.findAll();

      return res.status(200).json({
         code: 1,
         data,
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Get all lessons failed',
      });
   }
};

module.exports = {
   saveArticle,
   deleteArticle,
   getAllArticleSaved,
   getAllArticle,
   editArticle,
};
