const articleSavedService = require('../services/articleSavedService');

const saveArticle = async (req, res, next) => {
   const data = req.body;
   data.playerID = +data.playerID;
   data.newsID = +data.newsID;
   try {
      let response = await ArticleSaved.saveArticle(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Error from server',
      });
   }
};

const deleteArticle = async (req, res, next) => {
   const data = req.body;
   data.playerID = +data.playerID;
   data.newsID = +data.newsID;
   try {
      let response = await articleSavedService.deleteArticle(lessonID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Delete lesson failed',
      });
   }
};

const getAllArticleSaved = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 2,
         message: 'Missing parameters',
      });
   const playerID = req.query.playerID;
   try {
      let response = await articleSavedService.getAllArticleSaved();
      return res.status(200).json(response);
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
};
