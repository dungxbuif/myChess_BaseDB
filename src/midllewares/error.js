module.exports = (err, req, res, next) => {
   console.log(err);
   res.status(500).json({
      code: 0,
      message: `Error from server. ${err.message}`,
   });
};
