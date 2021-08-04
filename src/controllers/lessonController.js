const lessonService = require('../services/lessonService');

const createLesson = async (req, res, next) => {
   const data = req.body;

   try {
      let response = await lessonService.createLesson(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Error from server',
      });
   }
};

const editLesson = async (req, res, next) => {
   const { lessonID, title, content, thumbnail } = req.body;
   lessonID = +lessonID;

   const data = { lessonID, title, content, thumbnail };

   try {
      let response = await lessonService.editLesson(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Edit lesson failed',
      });
   }
};

const deleteLesson = async (req, res, next) => {
   const lessonID = +req.body.lessonID;
   try {
      let response = await lessonService.deleteLesson(lessonID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Delete lesson failed',
      });
   }
};

const getLesson = async (req, res, next) => {
   const lessonID = +req.query.playerID;
   try {
      let response = await lessonService.getLessons(lessonID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Get lesson failed',
      });
   }
};

const getAllLessons = async (req, res, next) => {
   try {
      let response = await lessonService.getAllLessons();
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
   createLesson,
   editLesson,
   deleteLesson,
   getLesson,
   getAllLessons,
};
