const db = require('../models');

const saveAiGame = async (req, res, next) => {
   const dataReq = req.body;
   dataReq.time = +dataReq.time;
   dataReq.moves = +dataReq.moves;
   console.log(dataReq);
   // if (
   //    !dataReq.playerID ||
   //    !dataReq.time ||
   //    !dataReq.result ||
   //    !dataReq.moves ||
   //    !dataReq.level ||
   //    !dataReq.date
   // ) {
   //    return res.status(404).json({
   //       code: 0,
   //       message: 'Missing required parameters',
   //    });
   // }

   try {
      let data = await db.AIGames.create({
         ...dataReq,
      });
      return res.status(200).json({
         code: 1,
         data,
         message: 'Save game succeed',
      });
   } catch (ex) {
      console.log(ex);
      return res.status(500).json({
         code: 0,
         message: `Save game failed. ${ex.message}`,
      });
   }
};

const deleteAiGame = async (req, res, next) => {
   const gameID = parseInt(req.body.gameID);
   if (!gameID) {
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }
   try {
      let data = await db.AIGames.destroy({
         where:{ gameID }
      });;

      return res.status(200).json({
         code: 1,
         message: 'Delete game succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Delete game failed. ${e}`,
      });
   }
};

const getAllAiGames = async (req, res, next) => {
   if (!req.query.playerID)
      return res.status(404).send({
         code: 0,
         message: 'Missing parameters',
      });
   const { playerID } = req.query;
   try {
      let data = await db.AIGames.findAll({
         playerID,
      });

      if (data) {
         return res.status(200).json({
            code: 1,
            data,
            message: `Get player's game succeed`,
         });
      } else {
         return res.status(404).json({
            code: 0,
            message: `Player doesn't exist`,
         });
      }
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get player's game failed. ${e.message}`,
      });
   }
};

module.exports = {
   saveAiGame,
   deleteAiGame,
   getAllAiGames,
};
