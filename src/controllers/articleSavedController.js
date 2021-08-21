const db = require('../models');

const saveArticle = async (req, res, next) => {
   const data = req.body;
   const playerID = +data.playerID;
   const newsID = +data.newsID;

   if (!playerID || !newsID) {
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   try {
      const data = await db.ArticleSaved.create({
         playerID,
         newsID,
      });

      return res.status(200).send({
         code: 1,
         data,
         message: 'Saved article succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         data,
         message: `Saved article failed. ${e}`,
      });
   }
};

const deleteArticle = async (req, res, next) => {
   const data = req.body;
   const playerID = +data.playerID;
   const newsID = +data.newsID;
   try {
      await db.ArticleSaved.destroy({
         where: {
            playerID,
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
};
