const db = require("../../data/dbConfig.js");
module.exports = async (req, res, next) => {
  try {
    const username = req.authenticatedUsername || req.body.username;
    const user = await db("users")
      .where({ username })
      .first();
    req.userObject = user;
    next();
  } catch (error) {
    res.status(500).json({
      error: "an error occurred (api/middleware/useernameExists.js)",
    });
  }
};
