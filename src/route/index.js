const express = require('express');
let router = express.Router();
const friendController = require('../controllers/friendController');
let initWebRoutes = (app) => {
   router.get('/', (req, res) => res.send('Hello World!!! '));

   //Friend
   router.post('/api/friend-request-sent', friendController.sendRequest);
   router.put('/api/accept-request', friendController.acceptRequest);
   router.delete('/api/unfriend', friendController.unfriend);
   router.get('/api/get-list-friends', friendController.getListFriends);

   return app.use('/', router);
};

module.exports = initWebRoutes;
