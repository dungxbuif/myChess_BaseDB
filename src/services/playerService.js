const db = require('../models/index');

const createPlayer = async (dataRequest) => {
   const { password, name, point } = dataRequest;
   return new Promise(async (resolve, reject) => {
      try {
         let data = await db.Players.create({ password, name, point });

         resolve({
            code: 1,
            message: 'Create player succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const deletePlayer = async (playerID) => {
   return new Promise(async (resolve, reject) => {
      try {
         await db.Players.destroy({
            where: { playerID },
         });

         resolve({
            code: 1,
            message: 'Delete player succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const editPlayer = async (dataRequest) => {
   const { password, name, point } = dataRequest;

   return new Promise(async (resolve, reject) => {
      try {
         const player = await db.Players.findOne({
            where: {
               playerID,
            },
         });

         player.password = password;
         player.name = name;
         player.point = point;

         const data = player.save();

         resolve({
            code: 1,
            message: 'Save player succeed',
            data,
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getPlayer = async (playerID) => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.Players.findOne({
            where: { playerID },
         });

         resolve({
            code: 1,
            data,
            message: 'Get player succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const getAllPlayers = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await db.Players.findAll();

         resolve({
            code: 1,
            data,
            message: 'Get all players succeed',
         });
      } catch (e) {
         reject(e);
      }
   });
};

const handleLogin = async (email, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         let isPlayer = await db.Players.findOne({
            where: { email },
         });

         let playerData = {
            code: 1,
            data: {
               email,
            },
         };

         if (isPlayer) {
            let playerPassword = isPlayer.password;

            if (password === playerPassword) {
               playerData.message = `OK`;
               playerData.data.name = isPlayer.name;
               playerData.data.playerID = isPlayer.playerID;
               playerData.data.point = isPlayer.point;
            } else {
               playerData.code = 0;
               playerData.message = `Wrong password`;
            }

            resolve(playerData);
            return;
         } else {
            playerData.code = 0;
            playerData.data = {};
            playerData.message = `Your player doesn't exist in the system. Please try again`;
         }

         resolve(playerData);
         return;
      } catch (e) {
         reject(e);
      }
   });
};

module.exports = {
   createPlayer,
   editPlayer,
   deletePlayer,
   getPlayer,
   getAllPlayers,
   handleLogin,
};
