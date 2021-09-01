const db = require('../models');

const createPlayer = async (req, res, next) => {
   console.log(req.body);
   if (!req.body.password || !req.body.name || !req.body.point || !req.body.email || !req.body.img) {
      res.status(404).json({
         code: 0,
         message: 'Missing required parameters',
      });
   }

   const { password, name, point, email, img } = req.body;
   try {
      let data = await db.Players.create({ password, name, point, email, img });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Create player succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Create player failed. ${e.message}`,
      });
   }
};

const editPlayer = async (req, res, next) => {
   if (
      !req.body.password ||
      !req.body.name ||
      !req.body.point ||
      !req.body.email ||
      !req.body.playerID
   ) {
      res.status(404).json({
         code: 0,
         message: 'Missing reqried parameters',
      });
   }

   let { password, name, point, email, playerID } = req.body;

   playerID = +playerID;

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

      res.status(200).json({
         code: 1,
         message: 'Edit player succeed',
         data,
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Edit player failed. ${e.message}`,
      });
   }
};

const deletePlayer = async (req, res, next) => {
   if (!req.body.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing reqried parameters',
      });
   }
   const playerID = +req.body.playerID;
   try {
      await db.Players.destroy({
         where: { playerID },
      });

      return res.status(200).json({
         code: 1,
         message: 'Delete player succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Delete player failed. ${e.message}`,
      });
   }
};

const getPlayer = async (req, res, next) => {
   if (!req.body.playerID) {
      res.status(404).json({
         code: 0,
         message: 'Missing reqried parameters',
      });
   }
   const playerID = +req.query.playerID;
   try {
      const data = await db.Players.findOne({
         where: { playerID },
      });

      return res.status(200).json({
         code: 1,
         data,
         message: 'Get player succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get player failed. ${e.message}`,
      });
   }
};

const getAllPlayers = async (req, res, next) => {
   try {
      const data = await db.Players.findAll();
      res.status(200).json({
         code: 1,
         data,
         message: 'Get all players succeed',
      });
   } catch (e) {
      console.log(e);
      return res.status(500).json({
         code: 0,
         message: `Get all players failed. ${e.message}`,
      });
   }
};

const handleLogin = async (req, res) => {
   if (!req.body.email || !password) {
      return res.status(404).json({
         code: 0,
         message: 'Missing required parameter!',
      });
   }

   let email = req.body.email;
   let password = req.body.password;

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
            return res.status(200).json(playerData);
         } else {
            playerData.code = 0;
            playerData.message = `Wrong password`;
            return res.status(404).json(playerData);
         }
      } else {
         playerData.code = 0;
         playerData.data = {};
         playerData.message = `Your player doesn't exist in the system. Please try again`;
         return res.status(404).json(playerData);
      }
   } catch (e) {
      return res.status(500).json({
         code: 1,
         message: `Login error. ${e.message}`,
      });
   }
};

module.exports = {
   createPlayer,
   editPlayer,
   deletePlayer,
   getPlayer,
   getAllPlayers,
   handleLogin,
};
