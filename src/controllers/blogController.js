const db = require('../models');

const createBlog = async (req, res, next) => {
   if (!req.body.content || !req.body.image || !req.body.playerID) {
      res.status(404).json({
         code: 1,
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
      console.log(ex);
      res.status(500).json({
         code: 0,
         message: `error from server. ${ex.message}`,
      });
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
      console.log(ex);
      res.status(500).json({
         code: 0,
         message: `error from server. ${ex.message}`,
      });
   }
};

module.exports = {
   createBlog,
   deleteBlog,
};
