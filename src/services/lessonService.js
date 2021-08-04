const db = require('../models/index');

const createLesson = async (dataRequest) => {
   const { title, content, thumbnail } = dataRequest;
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Lessons.create({
            title,
            content,
            thumbnail,
         });

         resolve({
            code: 1,
            message: 'Create lesson succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const deleteLesson = async (lessonID) => {
   return new Promise(async (resolve, reject) => {
      try {
         await db.Lessons.destroy({
            where: { lessonID },
         });

         resolve({
            code: 1,
            message: 'Delete lesson succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const editLesson = async (dataRequest) => {
   const { lessonID, title, content, thumbnail } = dataRequest;

   return new Promise(async (resolve, reject) => {
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

         resolve({
            code: 1,
            message: 'Save lesson succeed',
            data,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getLesson = async (lessonID) => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.Lessons.findOne({
            where: { lessonID },
         });

         resolve({
            code: 1,
            data,
            message: 'Get lesson succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getAllLessons = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.Lessons.findAll();

         resolve({
            code: 1,
            data,
            message: 'Get all lessons succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   createLesson,
   editLesson,
   deleteLesson,
   getLesson,
   getAllLessons,
};
