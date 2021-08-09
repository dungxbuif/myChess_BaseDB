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

module.exports = {
   createPlayer,
   editPlayer,
   deletePlayer,
   getPlayer,
   getAllPlayers,
};
