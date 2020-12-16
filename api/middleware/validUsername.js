module.exports = (req, res, next) => {
  if (req.body.username) {
    if (req.body.username.length > 3) {
      next();
    } else {
      res
        .status(400)
        .json({ error: `the username "${req.body.username}" is too short` });
    }
  } else {
    res.status(400).json({ error: "you must provide a username" });
  }
};
