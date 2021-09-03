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
      await db.Reacts.destroy({ where: { blogID } });
      await db.Blogs.destroy({
         where:{ blogID }
      });

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
   const blogID = +req.query.blogID;
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
   console.log(req.body);
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
         data = await db.Reacts.create({ blogID, playerID, like: status });
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

const getAllBlogByPlayerID = async (req, res, next) => {
   if (!req.query.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const playerID = +req.query.playerID;
   try {
      const reactBlog = await db.Reacts.findAll({
         where: { playerID },
      });

      let reactObj = {};
      if (reactBlog.length) {
         reactBlog.forEach((element) => {
            reactObj[element.blogID] = element.like;
         });
      }

      const blog = await db.Blogs.findAll({
         include: {
            model: db.Players, 
            as: 'reactData',
         },
         raw: false,
      });
      let data = blog.map((item) => item.dataValues);
      if (Object.entries(reactObj).length) {
         data = data.map((item) => {
            if (reactObj[item.blogID] !== undefined) {
               item.like = reactObj[item.blogID];
               return item;
            }
            return item;
         });
      }

      res.status(200).json({
         code: 1,
         data,
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
   getAllBlogByPlayerID,
};
