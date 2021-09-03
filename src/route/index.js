const express = require('express');
let router = express.Router();
const error = require('../midllewares/error');
const {
   friendController,
   articleSavedController,
   lessonController,
   playerController,
   aiGameController,
   blogController,
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
   axios.post('localhost:2000/api/friend-request-sent',data:{email} );
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

   //ArticleSaved
   router.post('/api/save-article', articleSavedController.saveArticle);
   router.delete('/api/delete-article', articleSavedController.deleteArticle);
   router.put('/api/edit-articles', articleSavedController.editArticle);
   router.get('/api/get-all-articlesaved', articleSavedController.getAllArticleSaved);
   router.get('/api/get-articles', articleSavedController.getAllArticle);

   //Players
   router.post('/api/create-player', playerController.createPlayer);
   router.put('/api/edit-player', playerController.editPlayer);
   router.delete('/api/delete-player', playerController.deletePlayer);
   router.get('/api/get-player', playerController.getPlayer);
   router.get('/api/get-all-players', playerController.getAllPlayers);
   router.post('/api/login', playerController.handleLogin);

   //AIGame
   router.post('/api/save-aigame', aiGameController.saveAiGame);
   router.delete('/api/delete-aigame', aiGameController.deleteAiGame);
   router.get('/api/get-all-aigame', aiGameController.getAllAiGames);

   //Blog
   router.post('/api/create-blog', blogController.createBlog);
   router.delete('/api/delete-blog', blogController.deleteBlog);
   router.delete('/api/unreact-blog', blogController.unreactBlog);
   router.post('/api/react-blog/:status', blogController.reactBlog);
   router.get('/api/react-blog/:status', blogController.getReactBlog);
   router.get('/api/get-all-blog-by-playerID', blogController.getAllBlogByPlayerID);

   router.use(error);

   return app.use('/', router);
};

module.exports = initWebRoutes;
