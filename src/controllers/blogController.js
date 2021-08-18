const db = require('../models');

const createBlog = async (req, res, next) => {
   if (!req.body.content || !req.body.image || !req.body.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   let { content, image, playerID } = req.body;
   playerID = +playerID;

   try {
      const data = await db.Blogs.create({ content, image, playerID });

      res.status(200).json({
         code: 1,
         message: `Create blog succeed`,
      });
   } catch (ex) {
      next(ex);
   }
};
const deleteBlog = async (req, res, next) => {
   if (!req.body.blogID) {
      res.status(200).json({
         code: 1,
         message: 'Missing required parameters',
      });
   }

   const blogID = +req.body.blogID;

   try {
      await db.Blogs.destroy({ blogID });

      res.status(200).json({
         code: 1,
         message: `Delete blog succeed`,
      });
   } catch (ex) {
      next(ex);
   }
};

const unreactBlog = async (req, res, next) => {
   if (!req.query.blogID || !req.query.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const blogID = +req.query.status;
   const playerID = +req.query.playerID;
   try {
      await db.Reacts.destroy({
         where: { playerID, blogID },
      });

      res.status(200).json({
         code: 1,
         message: `unreactBlog succeed`,
      });
   } catch (ex) {
      next(ex);
   }
};
const reactBlog = async (req, res, next) => {
   if (!req.params.status || !req.body.playerID || !req.body.blogID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const status = +req.params.status;
   const playerID = +req.body.playerID;
   const blogID = +req.body.blogID;

   try {
      const react = await db.Reacts.findOne({
         where: { blogID, playerID },
      });
      let data = null;
      if (react) {
         react.like = status;

         react.save();
         data = react;
      } else {
         data = await db.Reacts.create({ blogID, playerID, status });
      }

      res.status(200).json({
         code: 1,
         data,
         message: `React succeed`,
      });
   } catch (ex) {
      next(ex);
   }
};
const getReactBlog = async (req, res, next) => {
   if (!req.params.status || !req.query.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const status = +req.params.status;
   const playerID = +req.query.playerID;
   try {
      const data = await db.Reacts.findAll({
         where: { playerID, like: status },
      });
      res.status(200).json({
         code: 1,
         data,
         message: `getReactBlog succeed`,
      });
   } catch (ex) {
      next(ex);
   }
};

module.exports = {
   createBlog,
   deleteBlog,
   unreactBlog,
   reactBlog,
   getReactBlog,
};
