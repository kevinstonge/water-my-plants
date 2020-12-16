const db = require("../../data/dbConfig.js");
module.exports = async (req, res, next) => {
  try {
    const user = await db("users")
      .where({ username: req.body.username })
      .first();
    req.userObject = user;
    next();
  } catch (error) {
    res.status(500).json({
      error: "server error, see serverErrorMessage for details",
      serverErrorMessage: error,
      c: "api.mid.use.13",
    });
  }
};
