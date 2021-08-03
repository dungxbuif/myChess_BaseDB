const db = require('../models/index');

const sendRequest = async (data) => {
   const requesterID = +data.requesterID;
   const receiverID = +data.receiverID;
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.FriendRequests.create({
            requesterID,
            receiverID,
            status: false,
         });

         resolve({
            code: 1,
            message: 'Send request succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const unfriend = async (data) => {
   const requesterID = +data.requesterID;
   const receiverID = +data.receiverID;
   return new Promise(async (resolve, reject) => {
      try {
         await db.FriendShips.destroy({
            where: { playerID: requesterID, friendID: receiverID },
         });
         await db.FriendShips.destroy({
            where: { playerID: receiverID, friendID: requesterID },
         });

         resolve({
            code: 1,
            message: 'Unfriend succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const acceptRequest = async (data) => {
   const requesterID = +data.requesterID;
   const receiverID = +data.receiverID;
   return new Promise(async (resolve, reject) => {
      try {
         const acceptStatus = await db.FriendRequests.findOne({
            where: {
               requesterID,
               receiverID,
            },
         });

         const data = [];

         acceptStatus.status = true;
         await acceptStatus.save();
         const requester = await db.Players.findOne({
            where: { playerID: requesterID },
         });
         const receiver = await db.Players.findOne({
            where: { playerID: receiverID },
         });
         data[0] = await requester.addFriend(receiver);
         data[1] = await receiver.addFriend(requester);
         // data[0] = await requester.getFriend();
         resolve({
            code: 1,
            message: 'Succeed you are friends now',
            data,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getListFriends = async (playerID) => {
   return new Promise(async (resolve, reject) => {
      try {
         const player = await db.Players.findOne({
            where: { playerID },
         });

         const data = await player.getFriend();

         resolve({
            code: 1,
            data,
            message: 'Get list friend succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   sendRequest,
   acceptRequest,
   getListFriends,
   unfriend,
};
