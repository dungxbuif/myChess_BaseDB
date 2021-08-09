const playerService = require('../services/playerService');

const createPlayer = async (req, res, next) => {
   const data = req.body;

   try {
      let response = await playerService.createPlayer(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Error from server',
      });
   }
};

const editPlayer = async (req, res, next) => {
   const { playerID, title, content, thumbnail } = req.body;
   playerID = +playerID;

   const data = { playerID, title, content, thumbnail };

   try {
      let response = await playerService.editPlayer(data);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Edit player failed',
      });
   }
};

const deletePlayer = async (req, res, next) => {
   const playerID = +req.body.playerID;
   try {
      let response = await playerService.deletePlayer(playerID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Delete player failed',
      });
   }
};

const getPlayer = async (req, res, next) => {
   const playerID = +req.query.playerID;
   try {
      let response = await playerService.getPlayers(playerID);
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Get player failed',
      });
   }
};

const getAllPlayers = async (req, res, next) => {
   try {
      let response = await playerService.getAllPlayers();
      return res.status(200).json(response);
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: 'Get all players failed',
      });
   }
};

module.exports = {
   createPlayer,
   editPlayer,
   deletePlayer,
   getPlayer,
   getAllPlayers,
};
