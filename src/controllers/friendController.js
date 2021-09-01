const db = require('../models');

const sendRequest = async (req, res, next) => {
   if (!req.body.requesterID || !req.body.receiverID)
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   const requesterID = +req.body.requesterID;
   const receiverID = +req.body.receiverID;
   try {
      let data = await db.FriendRequests.create({
         requesterID,
         receiverID,
      });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Send request succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Send request failed. ${e}`,
      });
   }
};

const acceptRequest = async (req, res, next) => {
   if (!req.body.requesterID || !req.body.receiverID) {
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   const requesterID = +req.body.requesterID;
   const receiverID = +req.body.receiverID;

   try {
      await db.FriendRequests.destroy({

         where: {
            requesterID,
            receiverID,
         },
      });

      const data = [];
      const requester = await db.Players.findOne({
         where: { playerID: requesterID },
      });
      const receiver = await db.Players.findOne({
         where: { playerID: receiverID },
      });
      data[0] = await requester.addFriend(receiver);
      data[1] = await receiver.addFriend(requester);
      return res.status(200).send({
         code: 1,
         message: 'Succeed you are friends now',
         data,
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Accept request failed. ${e}`,
      });
   }
};

const unfriend = async (req, res, next) => {
   if (!req.body.requesterID || !req.body.receiverID) {
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   const requesterID = +req.body.requesterID;
   const receiverID = +req.body.receiverID;

   try {
      await db.FriendShips.destroy({
         where: { playerID: requesterID, friendID: receiverID },
      });
      await db.FriendShips.destroy({
         where: { playerID: receiverID, friendID: requesterID },
      });

      return res.status(200).json({
         code: 1,
         message: 'Unfriend succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'unfriend failed',
      });
   }
};

const getListFriends = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 0,
         message: 'Missing parameters',
      });

   const playerID = +req.query.playerID;

   try {
      const player = await db.Players.findOne({
         where: { playerID },
      });

      const data = await player.getFriend();

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get list friend succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get list friend failed. ${e.message}`,
      });
   }
};

const sentRequest = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 0,
         message: 'Missing parameters',
      });

   const playerID = +req.query.playerID;
   try {
      const request = await db.Players.findOne({
         where: { playerID },
      });

      const data = await request.getRequest();

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get sent requests succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get sent requests failed. ${e.message}`,
      });
   }
};

const receivedRequest = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 0,
         message: 'Missing parameters',
      });

   const playerID = +req.query.playerID;
   try {
      const request = await db.Players.findOne({
         where: { playerID },
      });

      const data = await request.getReceive();

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get received requests succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get received requests failed. ${e.message}`,
      });
   }
};

module.exports = {
   sendRequest,
   acceptRequest,
   getListFriends,
   unfriend,
   sentRequest,
   receivedRequest,
};
