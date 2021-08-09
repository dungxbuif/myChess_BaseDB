const express = require('express');
let router = express.Router();
const {
   friendController,
   articleSavedController,
   lessonController,
   playerController,
} = require('../controllers/');

let initWebRoutes = (app) => {
   router.get('/', (req, res) => res.send('Hello World!!! '));

   //Friend
   router.post('/api/friend-request-sent', friendController.sendRequest);
   router.put('/api/accept-request', friendController.acceptRequest);
   router.delete('/api/unfriend', friendController.unfriend);
   router.get('/api/get-list-friends', friendController.getListFriends);
   //Lấy yêu cầu kết bạn đã gửi, nhận
   router.get('/api/sent-request', friendController.sentRequest);
   router.get('/api/received-request', friendController.receivedRequest);

   /* Example axios 
   axios.post('localhost:2000/api/friend-request-sent',{data: });
   axios.put('localhost:2000/api/accept-request',{data: });
   axios.delete('localhost:2000/api/unfriend',{data: });
   axios.get(`localhost:2000/api/get-list-friends?playerID${biến}`);
   axios.get(`localhost:2000/api/sent-request?playerID${biến}`);
   axios.get(`localhost:2000/api/received-request?playerID${biến}`);
   */

   //Lesson
   router.post('/api/create-lesson', lessonController.createLesson);
   router.put('/api/edit-lesson', lessonController.editLesson);
   router.delete('/api/delete-lesson', lessonController.deleteLesson);
   router.get('/api/get-lesson', lessonController.getLesson);
   router.get('/api/get-all-lessons', lessonController.getAllLessons);

   //ArticleS08aved
   router.post('/api/save-article', articleSavedController.saveArticle);
   router.delete('/api/delete-article', articleSavedController.deleteArticle);
   router.get(
      '/api/get-all-articlesaved',
      articleSavedController.getAllArticleSaved,
   );

   //Players
   router.post('/api/create-player', playerController.createPlayer);
   router.put('/api/edit-player', playerController.editPlayer);
   router.delete('/api/delete-player', playerController.deletePlayer);
   router.get('/api/get-player', playerController.getPlayer);
   router.get('/api/get-all-players', playerController.getPlayers);

   //ArticleS08aved
   router.post('/api/save-article', articleSavedController.saveArticle);
   router.delete('/api/delete-article', articleSavedController.deleteArticle);
   router.get(
      '/api/get-all-articlesaved',
      articleSavedController.getAllArticleSaved,
   );

   return app.use('/', router);
};

module.exports = initWebRoutes;
