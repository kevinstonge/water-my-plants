const router = require("express").Router();
const Users = require("./user-model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateRegistrationInput = require("../middleware/validateRegistrationInput");
router.post("/register", validateRegistrationInput, async (req, res) => {
  try {
    const { username, phone, password } = req.body;
    if (req.userObject && req.userObject.username === username) {
      res.status(400).json({ error: "that username already exists" });
    } else {
      const hash = bcrypt.hashSync(password);
      const newUserObject = { username, phone, password: hash };
      const newUserId = await Users.createUser(newUserObject);
      const token = jwt.sign({ username }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res
        .status(201)
        .json({ message: "registration successful", newUserId, token });
    }
  } catch (error) {
    res.status(500).json({
      error:
        "an unknown error occurred while attempting to create the user, see serverErrorMessage for more details",
      serverErrorMessage: error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.getUserByUsername(username);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        res.status(200).json({ message: "login successful", token });
      } else {
        res.status(401).json({ error: "incorrect password" });
      }
    } else {
      res.status(400).json({ error: "username does not exist" });
    }
  } catch (error) {
    res.status(500).json({
      error: "server error, see serverErrorMessage for more details",
      serverErrorMessage: error,
    });
  }
});

module.exports = router;
