const friendService = require('../services/friendService');

const sendRequest = async (req, res, next) => {
   const data = req.body;

   try {
      let response = await friendService.sendRequest(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Error from server',
      });
   }
};

const acceptRequest = async (req, res, next) => {
   const data = req.body;
   try {
      let response = await friendService.acceptRequest(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Send request failed',
      });
   }
};

const unfriend = async (req, res, next) => {
   const data = req.body;
   try {
      let response = await friendService.unfriend(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Send request failed',
      });
   }
};

const getListFriends = async (req, res, next) => {
   const playerID = +req.query.playerID;
   try {
      let response = await friendService.getListFriends(playerID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Send request failed',
      });
   }
};

module.exports = {
   sendRequest,
   acceptRequest,
   getListFriends,
   unfriend,
};
