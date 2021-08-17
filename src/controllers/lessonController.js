const db = require('../models');

const createLesson = async (req, res, next) => {
   if (!req.body.title || !req.body.content || !req.body.thumbnail) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   const { title, content, thumbnail } = req.body;

   try {
      let data = await db.Lessons.create({
         title,
         content,
         thumbnail,
      });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Create lesson succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Error. ${e.message}`,
      });
   }
};

const editLesson = async (req, res, next) => {
   if (!req.body.title || !req.body.content || !req.body.thumbnail || !req.body.lessonID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   let { lessonID, title, content, thumbnail } = req.body;
   lessonID = +lessonID;

   try {
      const lesson = await db.Lessons.findOne({
         where: {
            lessonID,
         },
      });

      lesson.title = title;
      lesson.content = content;
      lesson.thumbnail = thumbnail;

      const data = lesson.save();

      return res.status(200).json({
         code: 1,
         message: 'Edit lesson succeed',
         data,
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Error. ${e.message}`,
      });
   }
};

const deleteLesson = async (req, res, next) => {
   if (!req.body.lessonID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const lessonID = +req.body.lessonID;
   try {
      await db.Lessons.destroy({
         where: { lessonID },
      });

      return res.status(200).json({
         code: 1,
         message: 'Delete lesson succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Error. ${e.message}`,
      });
   }
};

const getLesson = async (req, res, next) => {
   if (!req.body.lessonID) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   const lessonID = +req.query.playerID;
   try {
      const data = await db.Lessons.findOne({
         where: { lessonID },
      });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get lesson succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Error. ${e.message}`,
      });
   }
};

const getAllLessons = async (req, res, next) => {
   try {
      const data = await db.Lessons.findAll();

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get all lessons succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Error. ${e.message}`,
      });
   }
};

module.exports = {
   createLesson,
   editLesson,
   deleteLesson,
   getLesson,
   getAllLessons,
};
