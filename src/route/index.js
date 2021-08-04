const express = require('express');
let router = express.Router();
const friendController = require('../controllers/friendController');
const lessonController = require('../controllers/lessonController');

let initWebRoutes = (app) => {
   router.get('/', (req, res) => res.send('Hello World!!! '));

   //Friend
   router.post('/api/friend-request-sent', friendController.sendRequest);
   router.put('/api/accept-request', friendController.acceptRequest);
   router.delete('/api/unfriend', friendController.unfriend);
   router.get('/api/get-list-friends', friendController.getListFriends);

   //Lesson
   router.post('/api/create-lesson', lessonController.createLesson);
   router.put('/api/edit-lesson', lessonController.editLesson);
   router.delete('/api/delete-lesson', lessonController.deleteLesson);
   router.get('/api/get-lesson', lessonController.getLesson);
   router.get('/api/get-all-lessons', lessonController.getLesson);

   return app.use('/', router);
};

module.exports = initWebRoutes;
